import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsString()
  bio: string;
  @ApiProperty()
  @IsString()
  location: string;
  @ApiProperty()
  @IsString()
  status: string;
  @ApiProperty({ example: { "email": 'x' } })
  contacts: Object;
  @ApiProperty({ example: { "github": 'x' } })
  socialLinks: Object;
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The uploaded file',
  })
  file: any;
}
