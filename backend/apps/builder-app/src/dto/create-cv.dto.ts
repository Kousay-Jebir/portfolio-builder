import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateCvDto{
    @ApiProperty()
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty()
    @IsString()
    path:string

    @ApiProperty()
    @IsString()
    filename:string

}
