import { IsInt, IsOptional, IsString, IsNotEmpty, IsDateString } from "class-validator";
import * as typesCus from "../../../../types/types.cus.js";

export class AdminLogCreateForm {
    @IsOptional()
    @IsInt()
    id?: typesCus.ID;

    @IsInt()
    @IsNotEmpty()
    admin_id!: typesCus.ID;

    @IsOptional()
    @IsString()
    action?: string | null;

    @IsOptional()
    @IsString()
    target_table?: string | null;

    @IsOptional()
    @IsInt()
    target_id?: number | null;

    @IsOptional()
    @IsDateString()
    created_at?: typesCus.DateTimeString | null;
}

export class AdminLogUpdateForm {
    @IsInt()
    @IsNotEmpty()
    id!: typesCus.ID;

    @IsOptional()
    @IsInt()
    admin_id?: typesCus.ID;

    @IsOptional()
    @IsString()
    action?: string | null;

    @IsOptional()
    @IsString()
    target_table?: string | null;

    @IsOptional()
    @IsInt()
    target_id?: number | null;

    @IsOptional()
    @IsDateString()
    created_at?: typesCus.DateTimeString | null;
}

