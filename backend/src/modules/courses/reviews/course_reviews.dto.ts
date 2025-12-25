import { IsInt, IsOptional, IsString, IsNotEmpty, IsDateString } from "class-validator";
import * as typesCus from "../../../../types/types.cus.js";

export class CourseReviewCreateForm {
    @IsOptional()
    @IsInt()
    id?: typesCus.ID;

    @IsInt()
    @IsNotEmpty()
    course_id!: typesCus.ID;

    @IsInt()
    @IsNotEmpty()
    student_id!: typesCus.ID;

    @IsOptional()
    @IsInt()
    rating?: number | null;

    @IsOptional()
    @IsString()
    comment?: string | null;

    @IsOptional()
    @IsDateString()
    created_at?: typesCus.DateTimeString | null;
}

export class CourseReviewUpdateForm {
    @IsInt()
    @IsNotEmpty()
    id!: typesCus.ID;

    @IsOptional()
    @IsInt()
    course_id?: typesCus.ID;

    @IsOptional()
    @IsInt()
    student_id?: typesCus.ID;

    @IsOptional()
    @IsInt()
    rating?: number | null;

    @IsOptional()
    @IsString()
    comment?: string | null;

    @IsOptional()
    @IsDateString()
    created_at?: typesCus.DateTimeString | null;
}

