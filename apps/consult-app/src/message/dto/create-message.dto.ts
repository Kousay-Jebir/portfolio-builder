import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateMessageDto{
    @ApiProperty()
    @IsString()
    message : string
    @ApiProperty()
    @IsString()
    receiver:string
}