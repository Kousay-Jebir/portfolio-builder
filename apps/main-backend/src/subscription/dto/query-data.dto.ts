import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SubscriptionType } from '@portfolio-builder/shared';

export class QueryDataDto {
  
    


  
  @IsNotEmpty()
  @IsString()
  title: string;
@IsString()
  type: string;
  @IsString()
  userId:string
  @IsNotEmpty()
    @IsString()
    payment_id:string
}
