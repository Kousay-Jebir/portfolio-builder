import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { ActivitylogModule } from '../activitylog/activitylog.module';
import { TokenModule, SharedUserModule, UserProfile, UserProfileSchema } from '@portfolio-builder/shared';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[ MongooseModule.forFeature([
        { name: UserProfile.name, schema: UserProfileSchema },
        
      ]),ActivitylogModule,TokenModule,SharedUserModule],
  providers: [AnalyticsService],
  controllers: [AnalyticsController]
})
export class AnalyticsModule {}
