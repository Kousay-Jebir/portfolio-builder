import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ConsultUserService } from './consult-user.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BlacklistGuard, JwtAuthGuard } from '@portfolio-builder/shared';
import { PaginationDto } from 'libs/shared/src/pagination/dto/pagination.dto';
@ApiTags('users')
@Controller('users')
export class ConsultUserController {
constructor(private readonly consultUserService : ConsultUserService){}
  @UseGuards(JwtAuthGuard,BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
   
  @Get()
  async getUsers(@Query() pagination : PaginationDto) {
    return await this.consultUserService.getUsersWithPortfolio(pagination);
  }
@UseGuards(JwtAuthGuard,BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Get(':id/portfolios')
  async getPotfolios(@Param('id') id: string) {
    return await this.consultUserService.getUserPortfolios(id);
  }
}
