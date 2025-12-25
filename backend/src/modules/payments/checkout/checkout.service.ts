import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service.js';
import { CourseEnrollments_Service } from '../../courses/enrollments/course_enrollments.service.js';
import { CompleteCheckoutDto } from './checkout.dto.js';

@Injectable()
export class CheckoutService {
  constructor(
    private prisma: PrismaService,
    private courseEnrollmentsService: CourseEnrollments_Service
  ) {}

  /**
   * Complete checkout process:
   * 1. Create invoice
   * 2. Create invoice_details (chi tiết từng khóa học)
   * 3. Create enrollments
   * 4. Remove from cart
   * 5. Update course stats
   */
  async completeCheckout(dto: CompleteCheckoutDto) {
    const { course_ids, user_id, payment_method, transaction_code, billing_info, promo_code, discount_amount } = dto;

    // Ensure user_id is set
    if (!user_id) {
      throw new BadRequestException('User ID is required');
    }

    // Validate user exists
    const user = await this.prisma.accounts.findUnique({
      where: { id: user_id },
      select: {
        id: true,
        full_name: true,
        email: true
      }
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // 1. Get courses info
    const courses = await this.prisma.courses.findMany({
      where: { id: { in: course_ids } },
      include: {
        accounts: {
          select: {
            id: true,
            full_name: true
          }
        }
      }
    });

    if (courses.length !== course_ids.length) {
      throw new BadRequestException('Some courses not found');
    }

    // 2. Check if already enrolled in any course
    const existingEnrollments = await this.prisma.course_enrollments.findMany({
      where: {
        student_id: user_id,
        course_id: { in: course_ids }
      }
    });

    if (existingEnrollments.length > 0) {
      const enrolledIds = existingEnrollments.map(e => e.course_id).join(', ');
      throw new BadRequestException(
        `Already enrolled in courses: ${enrolledIds}`
      );
    }

    // 3. Calculate total amount
    const subtotal = courses.reduce((sum, course) => {
      return sum + Number(course.price);
    }, 0);

    const totalAmount = courses.reduce((sum, course) => {
      return sum + Number(course.discount_price || course.price);
    }, 0);

    let discount = subtotal - totalAmount;

    // 4. Verify promo code if provided
    if (promo_code && discount_amount) {
      // TODO: Implement promo code verification
      // For now, just use the discount_amount from frontend
      discount = discount_amount;
    }

    const finalTotal = totalAmount - discount;

    // 5. Prepare billing info
    const billingData = billing_info ? {
      customer_name: billing_info.full_name,
      customer_email: billing_info.email,
      customer_phone: billing_info.phone || null,
      customer_address: billing_info.address || null,
      payment_method: payment_method,
      promo_code: promo_code || null
    } : {
      customer_name: user.full_name,
      customer_email: user.email,
      customer_phone: null,
      customer_address: null,
      payment_method: payment_method,
      promo_code: promo_code || null
    };

    // 6. Create invoice first (hóa đơn tổng)
    const invoiceNumber = this.generateInvoiceNumber();
    const invoice = await this.prisma.invoices.create({
      data: {
        invoice_number: invoiceNumber,
        user_id,
        total_amount: finalTotal,
        subtotal: subtotal,
        discount: discount,
        tax: 0,
        billing_info: billingData,
        payment_method: payment_method,
        status: 'paid',
        issued_at: new Date(),
        paid_at: new Date(),
        notes: promo_code ? `Promo code applied: ${promo_code}` : null
      }
    });

    // 7. Create invoice_details for each course (chi tiết từng khóa học)
    const invoiceDetailsPromises = courses.map(course => {
      const amount = Number(course.discount_price || course.price);
      
      return this.prisma.invoice_details.create({
        data: {
          invoice_id: invoice.id,
          user_id,
          course_id: course.id,
          amount,
          transaction_code: transaction_code || this.generateTransactionCode(),
          status: 'completed',
          completed_at: new Date(),
          method_id: 1, // Default payment method
          payment_data: {
            payment_method,
            instructor_id: course.instructor_id,
            instructor_name: course.accounts.full_name,
            course_title: course.title
          }
        }
      });
    });

    const invoiceDetails = await Promise.all(invoiceDetailsPromises);

    // 8. Create enrollments for each course
    const enrollmentPromises = courses.map(course => {
      return this.courseEnrollmentsService.create({
        student_id: user_id,
        course_id: course.id
      })
        .catch(err => {
          console.error(`Failed to enroll in course ${course.id}:`, err);
          return null;
        });
    });

    const enrollments = await Promise.all(enrollmentPromises);
    const successfulEnrollments = enrollments.filter(e => e !== null);

    // 9. Remove courses from cart
    const cart = await this.prisma.carts.findUnique({
      where: { user_id }
    });

    if (cart) {
      await this.prisma.cart_items.deleteMany({
        where: {
          cart_id: cart.id,
          course_id: { in: course_ids }
        }
      });
    }

    // 10. Update course revenue
    const revenuePromises = courses.map(course => {
      const amount = Number(course.discount_price || course.price);
      return this.prisma.courses.update({
        where: { id: course.id },
        data: {
          revenue: {
            increment: amount
          }
        }
      });
    });

    await Promise.all(revenuePromises);

    return {
      success: true,
      message: 'Checkout completed successfully',
      invoice: {
        id: invoice.id,
        invoice_number: invoice.invoice_number,
        total_amount: Number(invoice.total_amount),
        issued_at: invoice.issued_at,
        billing_info: invoice.billing_info
      },
      invoice_details: invoiceDetails.map(detail => ({
        id: detail.id,
        course_id: detail.course_id,
        amount: Number(detail.amount),
        transaction_code: detail.transaction_code
      })),
      enrollments: successfulEnrollments,
      total_amount: finalTotal,
      enrolled_course_ids: successfulEnrollments.map(e => e?.course_id).filter(Boolean)
    };
  }

  /**
   * Generate unique invoice number
   * Format: INV-YYYYMMDD-XXXXX
   */
  private generateInvoiceNumber(): string {
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `INV-${dateStr}-${random}`;
  }

  /**
   * Generate unique transaction code
   */
  private generateTransactionCode(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `TXN${timestamp}${random}`;
  }

  /**
   * Get checkout summary before payment
   */
  async getCheckoutSummary(userId: number, courseIds: number[]) {
    const courses = await this.prisma.courses.findMany({
      where: { id: { in: courseIds } },
      select: {
        id: true,
        title: true,
        price: true,
        discount_price: true,
        thumbnail_url: true,
        accounts: {
          select: {
            full_name: true
          }
        }
      }
    });

    const subtotal = courses.reduce((sum, course) => {
      return sum + Number(course.price);
    }, 0);

    const total = courses.reduce((sum, course) => {
      return sum + Number(course.discount_price || course.price);
    }, 0);

    const discount = subtotal - total;

    return {
      courses: courses.map(c => ({
        id: c.id,
        title: c.title,
        price: Number(c.price),
        discount_price: Number(c.discount_price || c.price),
        thumbnail: c.thumbnail_url,
        instructor: c.accounts.full_name
      })),
      subtotal,
      discount,
      total,
      course_count: courses.length
    };
  }

  /**
   * Get all invoices for a user
   */
  async getUserInvoices(userId: number) {
    const invoices = await this.prisma.invoices.findMany({
      where: { user_id: userId },
      orderBy: { issued_at: 'desc' },
      include: {
        invoice_details: {
          include: {
            courses: {
              select: {
                id: true,
                title: true,
                thumbnail_url: true
              }
            }
          }
        }
      }
    });

    return {
      success: true,
      invoices: invoices.map(inv => ({
        id: inv.id,
        invoice_number: inv.invoice_number,
        total_amount: Number(inv.total_amount),
        subtotal: Number(inv.subtotal),
        discount: Number(inv.discount),
        tax: Number(inv.tax),
        payment_method: inv.payment_method,
        status: inv.status,
        issued_at: inv.issued_at,
        paid_at: inv.paid_at,
        billing_info: inv.billing_info,
        invoice_url: inv.invoice_url,
        notes: inv.notes,
        items: inv.invoice_details.map(detail => ({
          id: detail.id,
          course_id: detail.course_id,
          course_title: detail.courses?.title,
          course_thumbnail: detail.courses?.thumbnail_url,
          amount: Number(detail.amount),
          transaction_code: detail.transaction_code
        }))
      })),
      total: invoices.length
    };
  }

  /**
   * Get invoice by ID (with user verification)
   */
  async getInvoiceById(invoiceId: number, userId: number) {
    const invoice = await this.prisma.invoices.findFirst({
      where: {
        id: invoiceId,
        user_id: userId
      },
      include: {
        invoice_details: {
          include: {
            courses: {
              select: {
                id: true,
                title: true,
                thumbnail_url: true,
                accounts: {
                  select: {
                    full_name: true
                  }
                }
              }
            }
          }
        },
        accounts: {
          select: {
            id: true,
            full_name: true,
            email: true
          }
        }
      }
    });

    if (!invoice) {
      throw new BadRequestException('Invoice not found or access denied');
    }

    return {
      success: true,
      invoice: {
        id: invoice.id,
        invoice_number: invoice.invoice_number,
        total_amount: Number(invoice.total_amount),
        subtotal: Number(invoice.subtotal),
        discount: Number(invoice.discount),
        tax: Number(invoice.tax),
        payment_method: invoice.payment_method,
        status: invoice.status,
        issued_at: invoice.issued_at,
        paid_at: invoice.paid_at,
        billing_info: invoice.billing_info,
        invoice_url: invoice.invoice_url,
        notes: invoice.notes,
        items: invoice.invoice_details.map(detail => ({
          id: detail.id,
          course_id: detail.course_id,
          course_title: detail.courses?.title,
          course_thumbnail: detail.courses?.thumbnail_url,
          instructor: detail.courses?.accounts?.full_name,
          amount: Number(detail.amount),
          transaction_code: detail.transaction_code,
          status: detail.status,
          completed_at: detail.completed_at
        })),
        customer: {
          id: invoice.accounts.id,
          name: invoice.accounts.full_name,
          email: invoice.accounts.email
        }
      }
    };
  }
}
