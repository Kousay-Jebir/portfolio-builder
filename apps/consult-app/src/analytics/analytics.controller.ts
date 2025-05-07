import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService : AnalyticsService){}

    @Get('most-viewed-portfolios')
    async getMostViewedPortfolios(){
        return await this.analyticsService.getPortfoliosOwners()
        
    }


}
