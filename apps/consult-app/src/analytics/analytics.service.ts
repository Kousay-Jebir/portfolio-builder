import { Injectable } from '@nestjs/common';
import { ActivitylogService } from '../activitylog/activitylog.service';
import axios from 'axios';

@Injectable()
export class AnalyticsService {
    constructor(private readonly activityLogService : ActivitylogService,private readonly profileService :  ){}

    async getPortfoliosOwners(){
        const results = await this.activityLogService.getMostViewedPortfolioOwnerIds()
        const data =await Promise.all(
             results.map(async(item)=>{
                const profiles=await this.profileService

                
            })
        )

    }
}
