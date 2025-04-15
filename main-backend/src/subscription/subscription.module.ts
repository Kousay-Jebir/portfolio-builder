import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from './entities/subscription.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }]),AuthModule,UserModule,TokenModule],
  providers: [SubscriptionService],
  controllers: [SubscriptionController]
})
export class SubscriptionModule {}
