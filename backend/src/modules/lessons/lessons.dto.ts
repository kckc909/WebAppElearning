import { IsInt, IsOptional, IsString, IsNotEmpty, IsEmail, IsUrl, IsDateString, IsNumber, IsPositive, Length, MinLength } from "class-validator";
import * as typesCus from "../../../types/types.cus.js";

export type TLessons = typesCus.CourseLesson;

export class LessonsCreateForm {
    @IsOptional()
    @IsInt()
    id?: typesCus.ID;

    @IsInt()
    section_id!: number;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsOptional()
    @IsInt()
    order_index?: number | null;

    @IsOptional()
    @IsInt()
    layout?: number | null;
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
    @IsInt()
    order_index?: number | null;

    @IsOptional()
    @IsInt()
    layout?: number | null;
}
