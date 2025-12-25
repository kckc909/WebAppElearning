import { IsInt, IsNotEmpty } from 'class-validator';

export class AddToCartDto {
  @IsInt()
  @IsNotEmpty()
  course_id: number;
}

export class RemoveFromCartDto {
  @IsInt()
  @IsNotEmpty()
  course_id: number;
}

export class SyncCartDto {
  @IsInt({ each: true })
  course_ids: number[];
}
