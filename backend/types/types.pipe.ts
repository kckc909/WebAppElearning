import { IsInt, IsNotEmpty, Min } from "class-validator";

export class IdParam {
    @IsNotEmpty()
    id: number
}