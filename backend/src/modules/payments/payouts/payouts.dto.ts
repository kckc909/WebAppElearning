import { IsInt, IsOptional, IsNumber, IsDateString, IsNotEmpty } from "class-validator";
import * as typesCus from "../../../../types/types.cus.js";

export class PayoutCreateForm {
    @IsOptional()
    @IsInt()
    id?: typesCus.ID;

    @IsInt()
    @IsNotEmpty()
    instructor_id!: typesCus.ID;

    @IsOptional()
    @IsNumber()
    amount?: number | null;

    @IsOptional()
    @IsInt()
    status?: number | null;

    @IsOptional()
    @IsDateString()
    paid_at?: typesCus.DateTimeString | null;
}

export class PayoutUpdateForm {
    @IsInt()
    @IsNotEmpty()
    id!: typesCus.ID;

    @IsOptional()
    @IsInt()
    instructor_id?: typesCus.ID;

    @IsOptional()
    @IsNumber()
    amount?: number | null;

    @IsOptional()
    @IsInt()
    status?: number | null;

    @IsOptional()
    @IsDateString()
    paid_at?: typesCus.DateTimeString | null;
}

