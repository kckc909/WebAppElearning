import { IsInt, IsOptional, IsString, IsNotEmpty, IsUrl, IsDateString } from "class-validator";
import * as typesCus from "../../../../types/types.cus.js";

export class InstructorVerificationCreateForm {
    @IsOptional()
    @IsInt()
    id?: typesCus.ID;

    @IsInt()
    @IsNotEmpty()
    user_id!: typesCus.ID;

    @IsOptional()
    @IsString()
    experience?: string | null;

    @IsOptional()
    @IsString()
    education?: string | null;

    @IsOptional()
    @IsString()
    @IsUrl()
    documents_url?: string | null;

    @IsOptional()
    @IsInt()
    status?: number | null;

    @IsOptional()
    @IsDateString()
    created_at?: typesCus.DateTimeString | null;
}

export class InstructorVerificationUpdateForm {
    @IsInt()
    @IsNotEmpty()
    id!: typesCus.ID;

    @IsOptional()
    @IsInt()
    user_id?: typesCus.ID;

    @IsOptional()
    @IsString()
    experience?: string | null;

    @IsOptional()
    @IsString()
    education?: string | null;

    @IsOptional()
    @IsString()
    @IsUrl()
    documents_url?: string | null;

    @IsOptional()
    @IsInt()
    status?: number | null;

    @IsOptional()
    @IsDateString()
    created_at?: typesCus.DateTimeString | null;
}

