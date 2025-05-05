import { IsNumber, IsOptional } from "class-validator";

export class PaginationDto{

    @IsOptional()
    @IsNumber()
    offset?:number
    @IsOptional()
    @IsNumber()
    limit?:number
}