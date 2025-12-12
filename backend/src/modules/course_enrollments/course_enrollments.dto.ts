import { IsInt, IsOptional, IsString, IsNotEmpty, IsUrl, IsDateString, IsNumber } from "class-validator";
import * as typesCus from "../../../types/types.cus.js";

export class CourseEnrollmentCreateForm {
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
    @IsDateString()
    enrolled_at?: typesCus.DateTimeString | null;

    @IsOptional()
    @IsNumber()
    progress?: number | null;

    @IsOptional()
    @IsString()
    @IsUrl()
    certificate_url?: string | null;

    @IsOptional()
    @IsInt()
    status?: number | null;
}

export class CourseEnrollmentUpdateForm {
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
    @IsDateString()
    enrolled_at?: typesCus.DateTimeString | null;

    @IsOptional()
    @IsNumber()
    progress?: number | null;

    @IsOptional()
    @IsString()
    @IsUrl()
    certificate_url?: string | null;

    @IsOptional()
    @IsInt()
    status?: number | null;
}

