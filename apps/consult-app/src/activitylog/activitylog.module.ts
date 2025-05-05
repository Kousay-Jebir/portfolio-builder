import { Module } from '@nestjs/common';
import { ActivitylogService } from './activitylog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityLog, ActivityLogSchema } from './schema/activity-log.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: ActivityLog.name, schema: ActivityLogSchema }])],
  providers: [ActivitylogService],
  exports : [ActivitylogService]
})
export class ActivitylogModule {}
