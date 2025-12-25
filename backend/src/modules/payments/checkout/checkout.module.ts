import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller.js';
import { CheckoutService } from './checkout.service.js';
import { PrismaService } from '../../../prisma.service.js';
import { CourseEnrollments_Module } from '../../courses/enrollments/course_enrollments.module.js';

@Module({
  imports: [CourseEnrollments_Module],
  controllers: [CheckoutController],
  providers: [CheckoutService, PrismaService]
})
export class CheckoutModule {}
