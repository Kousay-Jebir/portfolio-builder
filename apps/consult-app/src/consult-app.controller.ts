import { Controller, Get, Param, Sse, UseGuards } from '@nestjs/common';
import { ConsultAppService } from './consult-app.service';
import { BlacklistGuard, ConnectedUser, JwtAuthGuard } from '@portfolio-builder/shared';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

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
  @UseGuards(JwtAuthGuard, BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('portfolios/:id')
  async getPortfolioByUrl(@Param('id') id :string,@ConnectedUser() user : any ){
    return await this.consultAppService.getPortfolioById(id,user)
  }

  
  @UseGuards(JwtAuthGuard, BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('portfolio/urls')
  async getPortfolioUrls(@ConnectedUser() user:any) {
    const portfolios=await this.consultAppService.getUserPortfolios(user.id)
    const portfoliosUrl = await portfolios.map((item)=>{return item._id})
    return portfoliosUrl
  }



  // @UseGuards(JwtAuthGuard, BlacklistGuard)
  // @ApiBearerAuth('JWT-auth')
  @Sse('events/:id')
  getEvents(@Param('id') id :string): Observable<{ data: any; event?: string }> {
    return this.consultAppService.connect(id);
  }

  
}
