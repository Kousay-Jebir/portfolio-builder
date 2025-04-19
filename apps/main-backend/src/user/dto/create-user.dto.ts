import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
import { UserRole } from "@portfolio-builder/shared"

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