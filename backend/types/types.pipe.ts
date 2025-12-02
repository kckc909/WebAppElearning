import { IsInt, Min } from "class-validator";

export class IdParam {
    @IsInt()
    id: number
}