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

      async getMostPortfolioOwnerIds(type:ActivityTypeEnum): Promise<{ ownerId: string; count: number }[]> {
        const results = await this.activityLogModel.aggregate([
          {
            $match: { type: type }
          },
          {
            $group: {
              _id: '$metadata.ownerId',
              count: { $sum: 1 }
            }
          },
          {
            $sort: { count: -1 }
          },
          {
            $project: {
              _id: 0,
              ownerId: '$_id',
              count: 1
            }
          }
        ]);
      
        return results;
      }
      
}
