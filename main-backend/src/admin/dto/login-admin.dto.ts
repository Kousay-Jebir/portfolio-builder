import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class AdminLoginDto{
       
    @ApiProperty({example:"xxxx"})
    @IsString()
    identifiant : string
    @ApiProperty({example:"xx"})
    @IsString()
    key:string
}