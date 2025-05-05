import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ActivityLog, ActivityLogDocument } from './schema/activity-log.schema';
import { Model } from 'mongoose';
import { ActivityTypeEnum } from './enum/activity-type.enum';

@Injectable()
export class ActivitylogService {
    constructor(
        @InjectModel(ActivityLog.name)
        private readonly activityLogModel: Model<ActivityLogDocument>,
      ) {}
    
      async logActivity(userId: string, type: ActivityTypeEnum, metadata: Record<string, any>) {
        return this.activityLogModel.create({
          user: userId,
          type,
          metadata,
        });
      }
    
      async getUserActivity(userId: string,) {
        return await this.activityLogModel
          .find({ user: userId})
          .sort({ createdAt: -1 })
          .exec();
      }
}
