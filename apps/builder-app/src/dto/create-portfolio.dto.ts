import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreatePortfolioDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;
  @ApiProperty()
  @IsNotEmpty()
  content: Object;
}
