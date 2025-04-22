import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BlacklistGuard, JwtAuthGuard, PortfolioService } from '@portfolio-builder/shared';
import axios from 'axios';

@Injectable()
export class BuildCvService {
   constructor(
      private readonly portfolioService: PortfolioService,
    ){}
    @UseGuards(JwtAuthGuard, BlacklistGuard)
    @ApiBearerAuth('JWT-auth')
    async getQuestions(portfolioId:string,userId:string){
        const portfolio = await this.portfolioService.findById(portfolioId);
    if (!portfolio) {
      return new NotFoundException('portfolio not found');
    }
    try {
    //   const result = await axios.post(`${process.env.AI_API}`, {
    //     portfolio: portfolio.content,
    //     userId: userId,
    //   });
      return portfolio
    } catch (err) {
      throw new Error(err);
    }

    }

}
