import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
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
  field: string;
  @ApiProperty({ example: { "email": 'x' } })
  @IsObject()
  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return {};
    }
  })
  contacts: Object;
  @ApiProperty({ example: { "github": 'x' } })
  @IsObject()
  @Transform(({ value }) => {
    try {
      return typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
      return {};
    }
  })
  socialLinks: Object;
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The uploaded file',
  })
  file: any;
}
