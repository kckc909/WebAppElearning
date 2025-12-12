import { IsInt, IsOptional, IsString, IsNotEmpty } from "class-validator";
import * as typesCus from "../../../types/types.cus.js";

export class CourseSectionCreateForm {
    @IsOptional()
    @IsInt()
    id?: typesCus.ID;

    @IsInt()
    @IsNotEmpty()
    course_id!: typesCus.ID;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsOptional()
    @IsInt()
    order_index?: number | null;
}

export class CourseSectionUpdateForm {
    @IsInt()
    @IsNotEmpty()
    id!: typesCus.ID;

    @IsOptional()
    @IsInt()
    course_id?: typesCus.ID;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsInt()
    order_index?: number | null;
}

