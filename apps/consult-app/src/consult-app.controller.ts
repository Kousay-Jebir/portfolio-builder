import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ConsultAppService } from './consult-app.service';
import { BlacklistGuard, JwtAuthGuard } from '@portfolio-builder/shared';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('consulting')
@Controller('consulting')
export class ConsultAppController {
  constructor(private readonly consultAppService: ConsultAppService) {}
  @UseGuards(JwtAuthGuard,BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  
  @Get()
  getHello(): string {
    return this.consultAppService.getHello();
  }

  @Get('users')
  async getUsers(){

    return await this.consultAppService.getUsersWithPortfolio()
    

  }

  @Get('users/:id/portfolios')
  async getPotfolios(@Param('id') id : string){
    return await this.consultAppService.getUserPortfolios(id)

  }

  @Get('portfolios/:id')
  async getPortfolioByUrl(@Param('id') id :string){
    return await this.consultAppService.getPortfolioById(id)
  }
}
