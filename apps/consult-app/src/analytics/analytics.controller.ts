import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActivityTypeEnum } from '../activitylog/enum/activity-type.enum';
import {
  BlacklistGuard,
  ConnectedUser,
  JwtAuthGuard,
} from '@portfolio-builder/shared';
@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('most-viewed-portfolios')
  async getMostViewedPortfolios() {
    return await this.analyticsService.getPortfoliosOwners(
      ActivityTypeEnum.VIEW,
    );
  }

  @Get('most-liked-portfolios')
  async getMostLikedPortfolios() {
    return await this.analyticsService.getPortfoliosOwners(
      ActivityTypeEnum.LIKE,
    );
  }
  @UseGuards(JwtAuthGuard, BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('recently-viewed')
  async getRecentlyViewed(@ConnectedUser() user: any) {
    return await this.analyticsService.getRecentlyViewed(user.id);
  }
  @UseGuards(JwtAuthGuard, BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('based-on-search')
  async getBasedOnSearch(@ConnectedUser() user : any){
    return await this.analyticsService.getMostSearch()



  }

}
