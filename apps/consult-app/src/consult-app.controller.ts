import { Controller, Get, Param, Patch, Post, Sse, UseGuards } from '@nestjs/common';
import { ConsultAppService } from './consult-app.service';
import { BlacklistGuard, ConnectedUser, JwtAuthGuard, Portfolio } from '@portfolio-builder/shared';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@Controller()
export class ConsultAppController {
  constructor(private readonly consultAppService: ConsultAppService) {}
  @UseGuards(JwtAuthGuard,BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  
  @Get()
  getHello(): string {
    return this.consultAppService.getHello();
  }
  @UseGuards(JwtAuthGuard, BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('portfolios/:id')
  async getPortfolioByUrl(@Param('id') id :string,@ConnectedUser() user : any ):Promise<Portfolio>{
    return await this.consultAppService.getPortfolioById(id,user)
  }

  
  @UseGuards(JwtAuthGuard, BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('portfolio/urls')
  async getPortfolioUrls(@ConnectedUser() user:any) :Promise<String[]> {
    const portfolios=await this.consultAppService.getUserPortfolios(user.id)
    const portfoliosUrl = await portfolios.map((item)=>{return item.id})
    return portfoliosUrl
  }

  @Patch('notification/:id')
  async seeNotification(@Param('id') id :string){

    return await this.consultAppService.updateNotfiStatus(id)
    
  }
}
