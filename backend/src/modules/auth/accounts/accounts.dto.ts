import { IsInt, IsOptional, IsString, IsNotEmpty, IsEmail, IsUrl, IsDateString, IsNumber, IsPositive, Length, MinLength } from "class-validator";
import * as typesCus from "../../../../types/types.cus.js";

export type TUser = typesCus.Accounts;

export class AccountCreateForm {
    @IsOptional()
    @IsInt()
    id?: typesCus.ID;

    @IsString()
    @IsNotEmpty()
    full_name!: string;

    @IsEmail()
    email!: string;

    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, {
        message: 'Mật khẩu phải có tối thiểu $constraint1 ký tự',
    })
    password_hash!: string;

    @IsOptional()
    @IsString()
    @IsUrl()
    avatar_url?: string | null;

    @IsOptional()
    @IsString()
    role?: string | null;

    @IsOptional()
    @IsInt()
    status?: number | null;

    @IsOptional()
    @IsDateString()
    created_at?: typesCus.DateTimeString | null;

    @IsOptional()
    @IsDateString()
    updated_at?: typesCus.DateTimeString | null;
}

export class AccountUpdateForm {
    @IsOptional()
    @IsInt()
    id?: typesCus.ID;

    @IsOptional()
    @IsString()
    full_name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    username?: string;

    @IsOptional()
    @IsString()
    @MinLength(6, {
        message: 'Mật khẩu phải có tối thiểu $constraint1 ký tự',
    })
    password_hash?: string;

    @IsOptional()
    @IsString()
    @IsUrl()
    avatar_url?: string | null;

    @IsOptional()
    @IsString()
    role?: string | null;

    @IsOptional()
    @IsInt()
    status?: number | null;

    @IsOptional()
    @IsDateString()
    created_at?: typesCus.DateTimeString | null;

    @IsOptional()
    @IsDateString()
    updated_at?: typesCus.DateTimeString | null;
}

export class LoginForm {

    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string
}

export class CheckExistsForm {
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    username!: string;
}