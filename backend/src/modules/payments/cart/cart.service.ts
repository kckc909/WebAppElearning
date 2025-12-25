import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service.js';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get or create cart for user
   */
  async getOrCreateCart(userId: number) {
    let cart = await this.prisma.carts.findUnique({
      where: { user_id: userId },
      include: {
        cart_items: {
          include: {
            courses: {
              select: {
                id: true,
                title: true,
                thumbnail_url: true,
                price: true,
                discount_price: true,
                average_rating: true,
                total_students: true,
                total_duration: true,
                slug: true,
                accounts: {
                  select: {
                    id: true,
                    full_name: true,
                    username: true
                  }
                }
              }
            }
          },
          orderBy: {
            added_at: 'desc'
          }
        }
      }
    });

    if (!cart) {
      cart = await this.prisma.carts.create({
        data: {
          user_id: userId
        },
        include: {
          cart_items: {
            include: {
              courses: {
                select: {
                  id: true,
                  title: true,
                  thumbnail_url: true,
                  price: true,
                  discount_price: true,
                  average_rating: true,
                  total_students: true,
                  total_duration: true,
                  slug: true,
                  accounts: {
                    select: {
                      id: true,
                      full_name: true,
                      username: true
                    }
                  }
                }
              }
            }
          }
        }
      });
    }

    return this.formatCartResponse(cart);
  }

  /**
   * Add course to cart
   */
  async addToCart(userId: number, courseId: number) {
    // Check if course exists
    const course = await this.prisma.courses.findUnique({
      where: { id: courseId }
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Check if user already enrolled
    const enrollment = await this.prisma.course_enrollments.findUnique({
      where: {
        student_id_course_id: {
          student_id: userId,
          course_id: courseId
        }
      }
    });

    if (enrollment) {
      throw new BadRequestException('You are already enrolled in this course');
    }

    // Get or create cart
    let cart = await this.prisma.carts.findUnique({
      where: { user_id: userId }
    });

    if (!cart) {
      cart = await this.prisma.carts.create({
        data: { user_id: userId }
      });
    }

    // Check if already in cart
    const existingItem = await this.prisma.cart_items.findUnique({
      where: {
        cart_id_course_id: {
          cart_id: cart.id,
          course_id: courseId
        }
      }
    });

    if (existingItem) {
      throw new ConflictException('Course already in cart');
    }

    // Add to cart
    await this.prisma.cart_items.create({
      data: {
        cart_id: cart.id,
        course_id: courseId
      }
    });

    return this.getOrCreateCart(userId);
  }

  /**
   * Remove course from cart
   */
  async removeFromCart(userId: number, courseId: number) {
    const cart = await this.prisma.carts.findUnique({
      where: { user_id: userId }
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartItem = await this.prisma.cart_items.findUnique({
      where: {
        cart_id_course_id: {
          cart_id: cart.id,
          course_id: courseId
        }
      }
    });

    if (!cartItem) {
      throw new NotFoundException('Course not in cart');
    }

    await this.prisma.cart_items.delete({
      where: { id: cartItem.id }
    });

    return this.getOrCreateCart(userId);
  }

  /**
   * Clear cart
   */
  async clearCart(userId: number) {
    const cart = await this.prisma.carts.findUnique({
      where: { user_id: userId }
    });

    if (!cart) {
      return { success: true, message: 'Cart is already empty' };
    }

    await this.prisma.cart_items.deleteMany({
      where: { cart_id: cart.id }
    });

    return { success: true, message: 'Cart cleared successfully' };
  }

  /**
   * Sync cart from localStorage
   */
  async syncCart(userId: number, courseIds: number[]) {
    // Get or create cart
    let cart = await this.prisma.carts.findUnique({
      where: { user_id: userId },
      include: {
        cart_items: true
      }
    });

    if (!cart) {
      cart = await this.prisma.carts.create({
        data: { user_id: userId },
        include: {
          cart_items: true
        }
      });
    }

    // Get existing course IDs in cart
    const existingCourseIds = cart.cart_items.map(item => item.course_id);

    // Find courses to add (in courseIds but not in cart)
    const coursesToAdd = courseIds.filter(id => !existingCourseIds.includes(id));

    // Find courses to keep (in both)
    const coursesToKeep = courseIds.filter(id => existingCourseIds.includes(id));

    // Remove courses not in courseIds
    const coursesToRemove = existingCourseIds.filter(id => !courseIds.includes(id));

    // Remove old items
    if (coursesToRemove.length > 0) {
      await this.prisma.cart_items.deleteMany({
        where: {
          cart_id: cart.id,
          course_id: { in: coursesToRemove }
        }
      });
    }

    // Add new items
    if (coursesToAdd.length > 0) {
      // Check if courses exist and user not enrolled
      const validCourses = await this.prisma.courses.findMany({
        where: {
          id: { in: coursesToAdd },
          course_enrollments: {
            none: {
              student_id: userId
            }
          }
        },
        select: { id: true }
      });

      const validCourseIds = validCourses.map(c => c.id);

      if (validCourseIds.length > 0) {
        await this.prisma.cart_items.createMany({
          data: validCourseIds.map(courseId => ({
            cart_id: cart.id,
            course_id: courseId
          })),
          skipDuplicates: true
        });
      }
    }

    return this.getOrCreateCart(userId);
  }

  /**
   * Get cart item count
   */
  async getCartCount(userId: number): Promise<number> {
    const cart = await this.prisma.carts.findUnique({
      where: { user_id: userId },
      include: {
        _count: {
          select: { cart_items: true }
        }
      }
    });

    return cart?._count.cart_items || 0;
  }

  /**
   * Format cart response
   */
  private formatCartResponse(cart: any) {
    const items = cart.cart_items.map(item => ({
      id: item.id,
      course_id: item.courses.id,
      title: item.courses.title,
      thumbnail: item.courses.thumbnail_url,
      instructor: item.courses.accounts.full_name,
      instructor_username: item.courses.accounts.username,
      price: Number(item.courses.price),
      discount_price: Number(item.courses.discount_price),
      rating: Number(item.courses.average_rating),
      total_students: item.courses.total_students,
      total_duration: item.courses.total_duration,
      slug: item.courses.slug,
      added_at: item.added_at
    }));

    const total = items.reduce((sum, item) => sum + (item.discount_price || item.price), 0);

    return {
      cart_id: cart.id,
      user_id: cart.user_id,
      items,
      item_count: items.length,
      total,
      created_at: cart.created_at,
      updated_at: cart.updated_at
    };
  }
}
