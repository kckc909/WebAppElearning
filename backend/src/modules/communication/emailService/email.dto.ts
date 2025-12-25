import { IsEmail, IsNotEmpty } from "class-validator";

export class Email {
    @IsNotEmpty()
    @IsEmail()
    email: string
}