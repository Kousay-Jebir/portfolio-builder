import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from './entities/subscription.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { EventModule, NotificationModule, TokenModule } from '@portfolio-builder/shared';

@Module({
  imports: [MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }]),AuthModule,UserModule,TokenModule,EventModule,NotificationModule],
  providers: [SubscriptionService],
  controllers: [SubscriptionController]
})
export class SubscriptionModule {}
