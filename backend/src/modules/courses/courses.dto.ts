import { IsInt, IsOptional, IsString, IsNotEmpty, IsEmail, IsUrl, IsDateString, IsNumber, IsPositive, Length, MinLength } from "class-validator";
import * as typesCus from "../../../types/types.cus.js";

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
    @IsInt()
    level?: number | null;

    @IsOptional()
    @IsString()
    language?: string | null;

    @IsOptional()
    @IsInt()
    price?: number | null;

    @IsOptional()
    @IsInt()
    discount_price?: number | null;

    @IsOptional()
    @IsString()
    @IsUrl()
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
    @IsInt()
    level?: number | null;

    @IsOptional()
    @IsString()
    language?: string | null;

    @IsOptional()
    @IsInt()
    price?: number | null;

    @IsOptional()
    @IsInt()
    discount_price?: number | null;

    @IsOptional()
    @IsString()
    @IsUrl()
    thumbnail?: string | null;

    @IsOptional()
    @IsInt()
    complete_at?: number | null;

    @IsOptional()
    @IsInt()
    status?: number | null;
}
