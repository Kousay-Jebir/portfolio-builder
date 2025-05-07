import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiTags } from '@nestjs/swagger';
import { ActivityTypeEnum } from '../activitylog/enum/activity-type.enum';
@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService : AnalyticsService){}

    @Get('most-viewed-portfolios')
    async getMostViewedPortfolios(){
        return await this.analyticsService.getPortfoliosOwners(ActivityTypeEnum.VIEW)
        
    }

    @Get('most-liked-portfolios')
    async getMostLikedPortfolios(){
        return await this.analyticsService.getPortfoliosOwners(ActivityTypeEnum.LIKE)

    }


}
