import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Portfolio, PortfolioDocument } from "./entity/portfolio.entity";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "../services/base.service";


@Injectable()
export class PortfolioService extends BaseService<PortfolioDocument> {
  constructor(
    @InjectModel(Portfolio.name)
    private portfolioModel: Model<PortfolioDocument>,
    
  ){super(portfolioModel);}

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


  async findByCriteria(criteria : Partial<Portfolio>){
    return await this.portfolioModel.find(criteria)
  }
}
