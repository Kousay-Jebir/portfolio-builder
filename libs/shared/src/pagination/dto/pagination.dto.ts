import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class PaginationDto{

    @ApiProperty({required:false})

    @IsOptional()
    @Type(() => Number)

    @IsNumber()
    offset?:number
    @ApiProperty({required:false})

    @IsOptional()
    @Type(() => Number)

    @IsNumber()
    limit?:number
    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    field?:string
}