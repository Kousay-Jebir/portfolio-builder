import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "../services/base.service";
import { Cv, CvDocument } from "./schemas/cv.schema";


@Injectable()
export class CvService extends BaseService<CvDocument> {
  constructor(
    @InjectModel(Cv.name)
    private cvModel: Model<CvDocument>,
    
  ){super(cvModel);}

  async findByOwnerId(id:string){
    return await this.cvModel.findOne({user:id})
  }

  
}
