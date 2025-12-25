import { IsInt, IsOptional, IsString, IsNotEmpty, IsEmail, IsUrl, IsDateString, IsNumber, IsPositive, Length, MinLength } from "class-validator";
import * as typesCus from "../../../../types/types.cus.js";

export type TCourses = typesCus.Course;

export class CoursesCreateForm {
    @IsOptional()
    @IsInt()
    id?: typesCus.ID;

    @IsInt()
    instructor_id!: number;

    @IsOptional()
    @IsInt()
    category_id?: number | null;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsOptional()
    @IsString()
    short_description?: string | null;

    @IsOptional()
    @IsString()
    description?: string | null;

    @IsOptional()
    @IsString()
    level?: string | null;

    @IsOptional()
    @IsString()
    language?: string | null;

    @IsOptional()
    @IsNumber()
    price?: number | null;

    @IsOptional()
    @IsNumber()
    discount_price?: number | null;

    @IsOptional()
    @IsString()
    thumbnail?: string | null;

    @IsOptional()
    @IsInt()
    complete_at?: number | null;

    @IsOptional()
    @IsInt()
    status?: number | null;

    @IsOptional()
    @IsDateString()
    created_at?: typesCus.DateTimeString | null;

    @IsOptional()
    what_you_will_learn?: any;

    @IsOptional()
    requirements?: any;

    @IsOptional()
    target_audience?: any;
}

export class CoursesUpdateForm {
    @IsInt()
    @IsPositive()
    id!: typesCus.ID;

    @IsOptional()
    @IsInt()
    instructor_id?: number;

    @IsOptional()
    @IsInt()
    category_id?: number | null;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    short_description?: string | null;

    @IsOptional()
    @IsString()
    description?: string | null;

    @IsOptional()
    @IsString()
    level?: string | null;

    @IsOptional()
    @IsString()
    language?: string | null;

    @IsOptional()
    @IsNumber()
    price?: number | null;

    @IsOptional()
    @IsNumber()
    discount_price?: number | null;

    @IsOptional()
    @IsString()
    thumbnail?: string | null;

    @IsOptional()
    @IsInt()
    complete_at?: number | null;

    @IsOptional()
    @IsInt()
    status?: number | null;

    @IsOptional()
    what_you_will_learn?: any;

    @IsOptional()
    requirements?: any;

    @IsOptional()
    target_audience?: any;
}
