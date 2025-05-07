import { Injectable } from '@nestjs/common';
import { ActivitylogService } from '../activitylog/activitylog.service';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { UserProfile, UserProfileDocument } from '@portfolio-builder/shared';
import { Model } from 'mongoose';

@Injectable()
export class AnalyticsService {
    constructor(private readonly activityLogService : ActivitylogService,@InjectModel(UserProfile.name) private readonly userProfileModel: Model<UserProfileDocument>,
    ){}

    async getPortfoliosOwners(){
        const results = await this.activityLogService.getMostViewedPortfolioOwnerIds()
        const data =await Promise.all(
             results.map(async(item)=>{
                const profile=await this.userProfileModel.findOne({user:item.ownerId})
                return {
                    ...profile,counter:item.viewCount
                }

                
            })
        )
        return data

    }
}
