import { IsInt, IsOptional, IsString, IsNotEmpty, IsDateString } from "class-validator";
import * as typesCus from "../../../../types/types.cus.js";

export class MessageCreateForm {
    @IsOptional()
    @IsInt()
    id?: typesCus.ID;

    @IsOptional()
    @IsInt()
    conversation_id?: number | null;

    @IsInt()
    @IsNotEmpty()
    sender_id!: typesCus.ID;

    @IsInt()
    @IsNotEmpty()
    receiver_id!: typesCus.ID;

    @IsString()
    @IsNotEmpty()
    message!: string;

    @IsOptional()
    @IsInt()
    status?: number | null;

    @IsOptional()
    @IsDateString()
    created_at?: typesCus.DateTimeString | null;
}

export class MessageUpdateForm {
    @IsInt()
    @IsNotEmpty()
    id!: typesCus.ID;

    @IsOptional()
    @IsInt()
    conversation_id?: number | null;

    @IsOptional()
    @IsInt()
    sender_id?: typesCus.ID;

    @IsOptional()
    @IsInt()
    receiver_id?: typesCus.ID;

    @IsOptional()
    @IsString()
    message?: string;

    @IsOptional()
    @IsInt()
    status?: number | null;

    @IsOptional()
    @IsDateString()
    created_at?: typesCus.DateTimeString | null;
}

