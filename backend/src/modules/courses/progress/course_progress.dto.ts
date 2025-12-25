import { IsInt, IsOptional, IsBoolean, IsDateString, IsNotEmpty } from "class-validator";
import * as typesCus from "../../../../types/types.cus.js";

export class CourseProgressCreateForm {
    @IsOptional()
    @IsInt()
    id?: typesCus.ID;

    @IsInt()
    @IsNotEmpty()
    enrollment_id!: typesCus.ID;

    @IsInt()
    @IsNotEmpty()
    lesson_id!: typesCus.ID;

    @IsOptional()
    @IsBoolean()
    is_completed?: boolean | null;

    @IsOptional()
    @IsDateString()
    completed_at?: typesCus.DateTimeString | null;
}

export class CourseProgressUpdateForm {
    @IsInt()
    @IsNotEmpty()
    id!: typesCus.ID;

    @IsOptional()
    @IsInt()
    enrollment_id?: typesCus.ID;

    @IsOptional()
    @IsInt()
    lesson_id?: typesCus.ID;

    @IsOptional()
    @IsBoolean()
    is_completed?: boolean | null;

    @IsOptional()
    @IsDateString()
    completed_at?: typesCus.DateTimeString | null;
}

