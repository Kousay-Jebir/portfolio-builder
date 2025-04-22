import { Injectable, NotFoundException } from '@nestjs/common';
import { PortfolioService } from '@portfolio-builder/shared';
import axios from 'axios';

@Injectable()
export class BuildCvService {
   constructor(
      private readonly portfolioService: PortfolioService,
    ){}

    async getQuestions(portfolioId:string,userId:string){
        const portfolio = await this.portfolioService.findById(portfolioId);
    if (!portfolio) {
      return new NotFoundException('portfolio not found');
    }
    try {
      const result = await axios.post(`${process.env.AI_API}`, {
        portfolio: portfolio.content,
        userId: userId,
      });
      
    } catch (err) {
      throw new Error(err);
    }

    }

}
