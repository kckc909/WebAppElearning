import { IsArray, IsInt, IsString, IsOptional, IsNumber, IsObject } from 'class-validator';

export class BillingInfoDto {
  @IsString()
  full_name!: string;

  @IsString()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;
}

export class CompleteCheckoutDto {
  @IsArray()
  @IsInt({ each: true })
  course_ids!: number[];

  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsString()
  payment_method!: string;

  @IsOptional()
  @IsString()
  transaction_code?: string;

  @IsOptional()
  @IsNumber()
  total_amount?: number;

  @IsOptional()
  @IsObject()
  billing_info?: BillingInfoDto;

  @IsOptional()
  @IsString()
  promo_code?: string;

  @IsOptional()
  @IsNumber()
  discount_amount?: number;
}

export class CheckoutResponseDto {
  success!: boolean;
  message!: string;
  invoice!: any;
  invoice_details!: any[];
  enrollments!: any[];
  total_amount!: number;
  enrolled_course_ids!: number[];
}
