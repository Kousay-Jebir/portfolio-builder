import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SubscriptionType } from 'src/enum/subscription-type.enum';

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
