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
    const portfolios = await this.findAllWithUserProfileOnly();
  
    const profiles = portfolios
      .map((p) => {
        if (typeof p.user === 'object' && 'profile' in p.user) {
          return (p.user as User).profile;
        }
        return null;
      })
      .filter((profile) => profile !== null);
  
    return profiles;
  }
  
  

  async getUserPortfolios(id: string) {
    return await this.portfolioModel.find({ userId: id });
  }

  async getPortfolioById(id : string){
    return await this.portfolioService.findById(id)
  }
  async findAllWithUserProfileOnly() {
    return this.portfolioModel
      .find()
      .populate({
        path: 'user',
        populate: {
          path: 'profile',
          model: 'UserProfile',
        },
      })
      .exec();
  }
}
