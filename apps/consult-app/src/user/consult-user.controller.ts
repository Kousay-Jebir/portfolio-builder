import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ConsultUserService } from './consult-user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BlacklistGuard, JwtAuthGuard } from '@portfolio-builder/shared';
@ApiTags('users')
@Controller('users')
export class ConsultUserController {
constructor(private readonly consultUserService : ConsultUserService){}
  @UseGuards(JwtAuthGuard,BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Get()
  async getUsers() {
    return await this.consultUserService.getUsersWithPortfolio();
  }
@UseGuards(JwtAuthGuard,BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Get(':id/portfolios')
  async getPotfolios(@Param('id') id: string) {
    return await this.consultUserService.getUserPortfolios(id);
  }
}
