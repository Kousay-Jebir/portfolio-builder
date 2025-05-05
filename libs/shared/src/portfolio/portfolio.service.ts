import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Portfolio, PortfolioDocument } from "./entity/portfolio.entity";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "../services/base.service";
import { PaginationService } from "../pagination/pagination.service";
import { PaginationDto } from "../pagination/dto/pagination.dto";


@Injectable()
export class PortfolioService extends BaseService<PortfolioDocument> {
  constructor(
    @InjectModel(Portfolio.name)
    private portfolioModel: Model<PortfolioDocument>,
    private readonly paginationService : PaginationService
    
  ){super(portfolioModel);}

  async findAllWithUserProfileOnly(pagination:PaginationDto) {
    const {offset,limit}=pagination

    return await   this.paginationService.paginate(this.portfolioModel
      .find(),offset,limit)  
      .populate({
        path: 'user',
        populate: {
          path: 'profile',
          model: 'UserProfile',
        },
      })
      .exec();
    // return await this.portfolioModel
    // .find()
    // .populate({
    //   path: 'user',
    //   populate: {
    //     path: 'profile',
    //     model: 'UserProfile',
    //   },
    // })
    // .exec();
  }


  async findByCriteria(criteria :any){
    return await this.portfolioModel.find(criteria)
  }
}
