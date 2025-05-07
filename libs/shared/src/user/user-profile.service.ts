import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { UserProfile , UserProfileDocument } from './entities/user-profile.entity';
import { BaseService } from '../services/base.service';

@Injectable()
export class UserService extends BaseService<UserProfileDocument>{

    constructor(@InjectModel(UserProfile.name) private userPortfolioModel: Model<UserProfileDocument>,){
        super(userPortfolioModel)
    }



    
      

}
