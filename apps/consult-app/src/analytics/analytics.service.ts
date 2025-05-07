import { Injectable } from '@nestjs/common';
import { ActivitylogService } from '../activitylog/activitylog.service';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { UserProfile, UserProfileDocument } from '@portfolio-builder/shared';
import { Model } from 'mongoose';
import { ActivityTypeEnum } from '../activitylog/enum/activity-type.enum';
import { use } from 'react';

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

    async getRecentlyViewed(userId:string){
        const ownerIds=await this.activityLogService.getRecentViews(userId)
        console.log(ownerIds)
        const data =await Promise.all(
            ownerIds.map(async(item)=>{
               const profile=await this.userProfileModel.findOne({user:item}).lean()
               return profile

               
           })
       )
       return data
        

    }
}
