import { Injectable } from '@nestjs/common';
import { PortfolioService } from '@portfolio-builder/shared';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';

@Injectable()
export class BuilderAppService {
   constructor(
      private readonly portfolioService: PortfolioService,
    ){}
  getHello(): string {
    return 'Hello World!';
  }

  async createPortfolio(createPortfolioDto:CreatePortfolioDto,userId:string){
    return this.portfolioService.create({code:createPortfolioDto.code,content:createPortfolioDto.content,user:userId})
  }

}
