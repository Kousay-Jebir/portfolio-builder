import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BlacklistedToken, BlacklistedTokenDocument } from "../entity/blacklisted-token.entity";
import { Model } from "mongoose";

@Injectable()
export class BlacklistedTokenService {


    constructor(@InjectModel(BlacklistedToken.name) private blacklistedTokenModel : Model<BlacklistedTokenDocument>){}

    async blacklistToken(token:string){
        const created = new this.blacklistedTokenModel({token:token});
    return created.save();
    }

    async isBlacklisted(token:string){
        return this.blacklistedTokenModel.findOne({token:token}).exec();

    }


}