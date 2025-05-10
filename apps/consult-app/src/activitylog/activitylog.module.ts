import { Module } from '@nestjs/common';
import { ActivitylogService } from './activitylog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityLog, ActivityLogSchema } from './schema/activity-log.schema';
import { ActivitylogController } from './activitylog.controller';
import { SharedModule, TokenModule } from '@portfolio-builder/shared';

@Module({
  imports:[MongooseModule.forFeature([{ name: ActivityLog.name, schema: ActivityLogSchema }]),TokenModule,SharedModule],
  providers: [ActivitylogService],
  exports : [ActivitylogService],
  controllers: [ActivitylogController]
})
export class ActivitylogModule {}
