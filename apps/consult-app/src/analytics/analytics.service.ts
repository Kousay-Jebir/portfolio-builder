import { Injectable } from '@nestjs/common';
import { ActivitylogService } from '../activitylog/activitylog.service';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { UserProfile, UserProfileDocument } from '@portfolio-builder/shared';
import { Model } from 'mongoose';
import { ActivityTypeEnum } from '../activitylog/enum/activity-type.enum';

@Injectable()
export class AnalyticsService {
    constructor(private readonly activityLogService : ActivitylogService,@InjectModel(UserProfile.name) private readonly userProfileModel: Model<UserProfileDocument>,
    ){}

    async getPortfoliosOwners(type : ActivityTypeEnum){
        const results = await this.activityLogService.getMostPortfolioOwnerIds(type)
        const data =await Promise.all(
             results.map(async(item)=>{
                const profile=await this.userProfileModel.findOne({user:item.ownerId}).lean()
                return {
                    ...profile,counter:item.count
                }

                
            })
        )
        return data

    }
}
