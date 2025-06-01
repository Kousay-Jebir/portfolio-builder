import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SubscriptionType } from '@portfolio-builder/shared';

export class CreateSubscriptionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty({enum:SubscriptionType,description:'type abonnement'})
  @IsNotEmpty()
  @IsEnum(SubscriptionType)
  type: string;
}
