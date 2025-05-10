import { Injectable } from '@nestjs/common';
import { ActivitylogService } from '../activitylog/activitylog.service';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { FieldTypeEnum, UserProfile, UserProfileDocument, UserProfileService } from '@portfolio-builder/shared';
import { Model } from 'mongoose';
import { ActivityTypeEnum } from '../activitylog/enum/activity-type.enum';
import { use } from 'react';

@Injectable()
export class AnalyticsService {
    constructor(private readonly activityLogService : ActivitylogService,private readonly userProfileService : UserProfileService,
    ){}

    async getPortfoliosOwners(type : ActivityTypeEnum){
        const results = await this.activityLogService.getMostPortfolioOwnerIds(type)
        const data =await Promise.all(
             results.map(async(item)=>{
                const profile=await this.userProfileService.findByCriteria({user:item.ownerId})
                // console.log('profile',profile)
                return {
                    ...profile,counter:item.count
                }

                
            })
        )
        // const data = await this.dataParsing(results)
        return data

    }

    async getRecentlyViewed(userId:string){
        const ownerIds=await this.activityLogService.getRecentViews(userId)
        console.log(ownerIds)
        const data =await Promise.all(
            ownerIds.map(async(item)=>{
               const profile=await this.userProfileService.findByCriteria({user:item})
               return profile

               
           })
       )
       return data
        

    }
    async getMostSearch(userId : string){
        // const category = await this.activityLogService.getMostSearchedCategory(userId)
        
        // const profiles=await this.userProfileService.findByCriteria({field:FieldTypeEnum.ENGINEERING})
        // return profiles

               
    }

    // async dataParsing(array : any[]){
    //     const data =await Promise.all(
    //         array.map(async(item)=>{
    //            const profile=await this.userProfileModel.findOne({user:item.ownerId}).lean()
    //            return {
    //                ...profile,counter:item.count
    //            }

               
    //        })
    //    )
    //    return data



    // }
}
