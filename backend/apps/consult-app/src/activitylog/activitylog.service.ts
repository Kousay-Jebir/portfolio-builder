import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ActivityLog, ActivityLogDocument } from './schema/activity-log.schema';
import { Model } from 'mongoose';
import { ActivityTypeEnum } from './enum/activity-type.enum';
import { AggregationService } from '@portfolio-builder/shared';

@Injectable()
export class ActivitylogService {
  constructor(
    @InjectModel(ActivityLog.name)
    private readonly activityLogModel: Model<ActivityLogDocument>,
    private readonly aggregationService : AggregationService
  ) {}

  async logActivity(
    userId: string,
    type: ActivityTypeEnum,
    metadata: Record<string, any>,
  ) {
    return this.activityLogModel.create({
      user: userId,
      type,
      metadata,
    });
  }

  async getUserActivity(userId: string, limit?: number) {
    const query = this.activityLogModel
      .find({ user: userId })
      .sort({ createdAt: -1 });
    if (limit) {
      query.limit(limit);
    }

    return query.exec();
  }

  async getMostPortfolioOwnerIds(
    type: ActivityTypeEnum,
  ): Promise<{ ownerId: string; count: number }[]> {
    const results=await this.aggregationService.buildAggregation({matchCriteria:{type:type},groupField:'metadata.ownerId',sortOptions:{count:-1}},this.activityLogModel)
    // const results = await this.activityLogModel.aggregate([
    //   {
    //     $match: { type: type },
    //   },
    //   {
    //     $group: {
    //       _id: '$metadata.ownerId',
    //       count: { $sum: 1 },
    //     },
    //   },
    //   {
    //     $sort: { count: -1 },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       ownerId: '$_id',
    //       count: 1,
    //     },
    //   },
    // ]);

    return results;
  }

  async getRecentViews(userId: string) {
    const logs = await this.activityLogModel.find({ user: userId ,type:ActivityTypeEnum.VIEW});
   
    return logs;
  }

  async getMostSearchedCategory(userId: string) {
    const results=await this.aggregationService.buildAggregation({matchCriteria:{type:ActivityTypeEnum.SEARCH,user:userId},groupField:'metadata.category',sortOptions:{count:-1}},this.activityLogModel)
    // const result = await this.activityLogModel.aggregate([
    //   {
    //     $match: {
    //       type: ActivityTypeEnum.SEARCH,
    //       user: userId,
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: '$metadata.category',
    //       count: { $sum: 1 },
    //     },
        
    //   },
    //     {
    //     $project: {
    //       _id: 0,
    //       category: '$_id',
    //       count: 1,
    //     },
    //   },
      
    //   { $sort: { count: -1 } },
    //   { $limit: 1 },
    // ]);
    if(results.length==0){
      throw new NotFoundException('there is no search')
    }
    return results[0].category
  }

  // async getViewLogByOwner(ownerId:string){
  //   const log = await this.activityLogModel.find({'metadata.ownerId':ownerId})
  //   return log
  // }
}
