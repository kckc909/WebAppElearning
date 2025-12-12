import { IsInt, IsOptional, IsString, IsBoolean } from "class-validator";
import * as typesCus from "../../../types/types.cus.js";

export class PaymentMethodCreateForm {
    @IsOptional()
    @IsInt()
    id?: typesCus.ID;

    @IsOptional()
    @IsString()
    method_name?: string | null;

    @IsOptional()
    @IsString()
    provider?: string | null;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean | null;
}

export class PaymentMethodUpdateForm {
    @IsInt()
    id!: typesCus.ID;

    @IsOptional()
    @IsString()
    method_name?: string | null;

    @IsOptional()
    @IsString()
    provider?: string | null;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean | null;
}

