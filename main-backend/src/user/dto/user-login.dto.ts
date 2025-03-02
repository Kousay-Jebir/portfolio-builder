import { ApiProperty } from "@nestjs/swagger"

export class UserLoginDto{
       
    @ApiProperty({example:"test@email.com"})
    email : string
    @ApiProperty({example:"password"})
    password:string
}