import { IsInt, IsOptional, IsString, IsNotEmpty } from "class-validator";
import * as typesCus from "../../../types/types.cus.js";

export class CourseCategoryCreateForm {
    @IsOptional()
    @IsInt()
    id?: typesCus.ID;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsOptional()
    @IsInt()
    parent_id?: number | null;
}

export class CourseCategoryUpdateForm {
    @IsInt()
    @IsNotEmpty()
    id!: typesCus.ID;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsInt()
    parent_id?: number | null;
}

