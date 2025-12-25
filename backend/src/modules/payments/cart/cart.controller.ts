import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service.js';
import { AddToCartDto, SyncCartDto } from './cart.dto.js';

// TODO: Import your auth guard
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
// @UseGuards(JwtAuthGuard) // Uncomment when auth is ready
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * Get user's cart
   * GET /cart
   */
  @Get()
  async getCart(@Request() req) {
    const userId = req.user?.id || req.headers['x-user-id']; // Temporary for testing
    if (!userId) {
      return { error: 'User not authenticated' };
    }
    return this.cartService.getOrCreateCart(Number(userId));
  }

  /**
   * Get cart item count
   * GET /cart/count
   */
  @Get('count')
  async getCartCount(@Request() req) {
    const userId = req.user?.id || req.headers['x-user-id'];
    if (!userId) {
      return { count: 0 };
    }
    const count = await this.cartService.getCartCount(Number(userId));
    return { count };
  }

  /**
   * Add course to cart
   * POST /cart/items
   */
  @Post('items')
  async addToCart(@Request() req, @Body() dto: AddToCartDto) {
    const userId = req.user?.id || req.headers['x-user-id'];
    if (!userId) {
      return { error: 'User not authenticated' };
    }
    return this.cartService.addToCart(Number(userId), dto.course_id);
  }

  /**
   * Remove course from cart
   * DELETE /cart/items/:courseId
   */
  @Delete('items/:courseId')
  async removeFromCart(
    @Request() req,
    @Param('courseId', ParseIntPipe) courseId: number
  ) {
    const userId = req.user?.id || req.headers['x-user-id'];
    if (!userId) {
      return { error: 'User not authenticated' };
    }
    return this.cartService.removeFromCart(Number(userId), courseId);
  }

  /**
   * Clear cart
   * DELETE /cart
   */
  @Delete()
  async clearCart(@Request() req) {
    const userId = req.user?.id || req.headers['x-user-id'];
    if (!userId) {
      return { error: 'User not authenticated' };
    }
    return this.cartService.clearCart(Number(userId));
  }

  /**
   * Sync cart from localStorage
   * POST /cart/sync
   */
  @Post('sync')
  async syncCart(@Request() req, @Body() dto: SyncCartDto) {
    const userId = req.user?.id || req.headers['x-user-id'];
    if (!userId) {
      return { error: 'User not authenticated' };
    }
    return this.cartService.syncCart(Number(userId), dto.course_ids);
  }
}
