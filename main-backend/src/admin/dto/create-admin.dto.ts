import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateAdminDto{
@ApiProperty({example:"test"})
@IsString()
    identifiant : string
   
    @ApiProperty({example:"password"})
    @IsString()
    key:string
}
