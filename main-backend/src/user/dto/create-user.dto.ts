import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto{
@ApiProperty({example:"test"})
    username : string
    @ApiProperty({example:"test@email.com"})
    email : string
    @ApiProperty({example:"password"})
    password:string
}