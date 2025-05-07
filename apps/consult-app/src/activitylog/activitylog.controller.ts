import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BlacklistGuard, ConnectedUser, JwtAuthGuard } from '@portfolio-builder/shared';
import { ActivitylogService } from './activitylog.service';

@Controller('activity')
export class ActivitylogController {
    constructor(private readonly activityLogService : ActivitylogService){}
    @UseGuards(JwtAuthGuard,BlacklistGuard)
    @ApiBearerAuth('JWT-auth')
    @Get()
    async getMyActivity(@ConnectedUser() user : any){

        return await this.activityLogService.getUserActivity(user.id)


    }

}
