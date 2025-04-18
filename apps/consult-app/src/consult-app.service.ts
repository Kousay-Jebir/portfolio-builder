import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Portfolio,
  PortfolioDocument,
  PortfolioService,
  User,
  UserDocument,
} from '@portfolio-builder/shared';
import { Model } from 'mongoose';

@Injectable()
export class ConsultAppService {
  constructor(
    @InjectModel(Portfolio.name)
    private readonly portfolioModel: Model<PortfolioDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly portfolioService: PortfolioService,
  ) {}
  getHello(): string {
    return 'Hello World From Consult!';
  }

  async getUsersWithPortfolio() {
    const portfolios = await this.portfolioService.findAll();
    const usersData = await Promise.all(
      portfolios.map(async (item) => {
        return await item.populate('userId');
      }),
    );
    return usersData;
  }

  async getUserPortfolios(id: string) {
    return await this.portfolioModel.find({ userId: id });
  }

  async getPortfolioById(id : string){
    return await this.portfolioService.findById(id)
  }
}
