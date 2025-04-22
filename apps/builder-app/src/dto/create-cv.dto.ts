import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCvDto{
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    path:string


}
