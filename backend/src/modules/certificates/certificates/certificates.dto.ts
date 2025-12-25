import { IsInt, IsOptional, IsString, IsNotEmpty, IsUrl, IsDateString } from "class-validator";
import * as typesCus from "../../../../types/types.cus.js";

export class CertificateCreateForm {
    @IsOptional()
    @IsInt()
    id?: typesCus.ID;

    @IsInt()
    @IsNotEmpty()
    student_id!: typesCus.ID;

    @IsInt()
    @IsNotEmpty()
    course_id!: typesCus.ID;

    @IsOptional()
    @IsString()
    certificate_code?: string | null;

    @IsOptional()
    @IsDateString()
    issued_at?: typesCus.DateTimeString | null;

    @IsOptional()
    @IsString()
    @IsUrl()
    pdf_url?: string | null;
}

export class CertificateUpdateForm {
    @IsInt()
    @IsNotEmpty()
    id!: typesCus.ID;

    @IsOptional()
    @IsInt()
    student_id?: typesCus.ID;

    @IsOptional()
    @IsInt()
    course_id?: typesCus.ID;

    @IsOptional()
    @IsString()
    certificate_code?: string | null;

    @IsOptional()
    @IsDateString()
    issued_at?: typesCus.DateTimeString | null;

    @IsOptional()
    @IsString()
    @IsUrl()
    pdf_url?: string | null;
}

