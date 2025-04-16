import { ApiProperty } from "@nestjs/swagger"

export class PersonalDataDto{
@ApiProperty()
    firstName : string
    @ApiProperty()
    lastName : string
    @ApiProperty()
    adress : string
    @ApiProperty()
    phone:string
}