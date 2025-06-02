import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class UserLoginDto{
       
    @ApiProperty({example:"test@email.com"})
    @IsString()
    email : string
    @ApiProperty({example:"password"})
    @IsString()
    password:string
}