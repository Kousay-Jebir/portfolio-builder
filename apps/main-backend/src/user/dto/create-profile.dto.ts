import { ApiProperty } from '@nestjs/swagger';
import { FieldTypeEnum } from '@portfolio-builder/shared';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsObject, IsString } from 'class-validator';

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
  @ApiProperty({enum:FieldTypeEnum})
  @IsEnum(FieldTypeEnum, { message: 'field must be a valid FieldTypeEnum value' })
  field: FieldTypeEnum;
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
