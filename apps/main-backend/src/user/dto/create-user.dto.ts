import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
import { UserRole } from "../../enum/user-role.enum"

export class CreateUserDto{
@ApiProperty({example:"test"})
@IsNotEmpty()
@IsString()
    username : string
    @ApiProperty({example:"test@email.com"})
    @IsNotEmpty()
@IsString()
    email : string
    @ApiProperty({example:"password"})
    @IsNotEmpty()
@IsString()
    password:string
}