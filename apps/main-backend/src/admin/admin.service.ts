import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '@portfolio-builder/shared';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { User, UserDocument } from '@portfolio-builder/shared';
import { UserLoginDto } from '../user/dto/user-login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';


@Injectable()
export class AdminService extends BaseService<UserDocument> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){
    super(userModel)
  }
  
}
