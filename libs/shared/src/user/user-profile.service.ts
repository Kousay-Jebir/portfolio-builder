import { Injectable } from "@nestjs/common";
import { BaseService } from "../services/base.service";
import { UserProfile, UserProfileDocument } from "./entities/user-profile.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserProfileService extends BaseService<UserProfileDocument>{
    constructor(@InjectModel(UserProfile.name) private userProfileModel: Model<UserProfileDocument>){
        super(userProfileModel)
    }

    async findByCriteria(criteria : Partial<UserProfile>){
        return await this.userProfileModel.findOne({criteria}).lean()
        
    }
    
}