import { Controller, Post, Get, Body, Request, Query } from '@nestjs/common';
import { CheckoutService } from './checkout.service.js';
import { CompleteCheckoutDto } from './checkout.dto.js';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  /**
   * Complete checkout and create enrollments
   * POST /checkout/complete
   */
  @Post('complete')
  async completeCheckout(@Body() dto: CompleteCheckoutDto, @Request() req) {
    // Get user_id from auth or header
    const userId = req.user?.id || req.headers['x-user-id'];
    
    if (!userId) {
      return { 
        success: false, 
        error: 'User not authenticated' 
      };
    }

    dto.user_id = Number(userId);
    
    return this.checkoutService.completeCheckout(dto);
  }

  /**
   * Get checkout summary
   * GET /checkout/summary?course_ids=1,2,3
   */
  @Get('summary')
  async getCheckoutSummary(@Request() req, @Query('course_ids') courseIdsStr: string) {
    const userId = req.user?.id || req.headers['x-user-id'];
    
    if (!userId) {
      return { error: 'User not authenticated' };
    }

    const courseIds = courseIdsStr.split(',').map(id => Number(id));
    
    return this.checkoutService.getCheckoutSummary(Number(userId), courseIds);
  }

  /**
   * Get user invoices
   * GET /checkout/invoices
   */
  @Get('invoices')
  async getUserInvoices(@Request() req) {
    const userId = req.user?.id || req.headers['x-user-id'];
    
    if (!userId) {
      return { error: 'User not authenticated' };
    }

    return this.checkoutService.getUserInvoices(Number(userId));
  }

  /**
   * Get invoice by ID
   * GET /checkout/invoices/:id
   */
  @Get('invoices/:id')
  async getInvoiceById(@Request() req, @Query('id') id: string) {
    const userId = req.user?.id || req.headers['x-user-id'];
    
    if (!userId) {
      return { error: 'User not authenticated' };
    }

    return this.checkoutService.getInvoiceById(Number(id), Number(userId));
  }
}
