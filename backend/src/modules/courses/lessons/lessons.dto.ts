import { IsInt, IsOptional, IsString, IsNotEmpty, IsEmail, IsUrl, IsDateString, IsNumber, IsPositive, Length, MinLength, IsBoolean } from "class-validator";
import * as typesCus from "../../../../types/types.cus.js";

export type TLessons = typesCus.CourseLesson;

export class LessonsCreateForm {
    @IsOptional()
    @IsInt()
    id?: typesCus.ID;

    @IsInt()
    @IsNotEmpty()
    course_id!: number;

    @IsInt()
    section_id!: number;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsOptional()
    @IsString()
    description?: string | null;

    @IsOptional()
    @IsInt()
    order_index?: number | null;

    @IsOptional()
    @IsInt()
    layout?: number | null;

    @IsOptional()
    @IsBoolean()
    is_preview?: boolean;
}

export class LessonsUpdateForm {
    @IsInt()
    @IsPositive()
    id!: typesCus.ID;

    @IsOptional()
    @IsInt()
    section_id?: number;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string | null;

    @IsOptional()
    @IsInt()
    order_index?: number | null;

    @IsOptional()
    @IsInt()
    layout?: number | null;

    @IsOptional()
    @IsBoolean()
    is_preview?: boolean;
}
