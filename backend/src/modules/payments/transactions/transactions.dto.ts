import { IsInt, IsOptional, IsString, IsNumber, IsDateString } from "class-validator";
import * as typesCus from "../../../../types/types.cus.js";

export class TransactionCreateForm {
    @IsOptional()
    @IsInt()
    id?: typesCus.ID;

    @IsInt()
    user_id!: typesCus.ID;

    @IsOptional()
    @IsInt()
    course_id?: number | null;

    @IsOptional()
    @IsNumber()
    amount?: number | null;

    @IsOptional()
    @IsInt()
    method_id?: number | null;

    @IsOptional()
    @IsString()
    transaction_code?: string | null;

    @IsOptional()
    @IsInt()
    status?: number | null;

    @IsOptional()
    @IsDateString()
    created_at?: typesCus.DateTimeString | null;
}

export class TransactionUpdateForm {
    @IsInt()
    id!: typesCus.ID;

    @IsOptional()
    @IsInt()
    user_id?: typesCus.ID;

    @IsOptional()
    @IsInt()
    course_id?: number | null;

    @IsOptional()
    @IsNumber()
    amount?: number | null;

    @IsOptional()
    @IsInt()
    method_id?: number | null;

    @IsOptional()
    @IsString()
    transaction_code?: string | null;

    @IsOptional()
    @IsInt()
    status?: number | null;

    @IsOptional()
    @IsDateString()
    created_at?: typesCus.DateTimeString | null;
}

