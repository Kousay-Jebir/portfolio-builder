import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class PersonalDataDto{
@ApiProperty()
@IsString()
    firstName : string
    @ApiProperty()
    @IsString()
    lastName : string
    @ApiProperty()
    @IsString()
    adress : string
    @ApiProperty()
    @IsString()
    phone:string
    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'The uploaded file',
      })
      file: any;
}