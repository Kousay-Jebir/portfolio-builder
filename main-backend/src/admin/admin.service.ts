import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/services/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { User, UserDocument } from 'src/user/entities/user.entity';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';


@Injectable()
export class AdminService extends BaseService<UserDocument> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){
    super(userModel)
  }
  
      
      async createAdmin (createAdminDto : CreateUserDto){

            
              
      
          }
}
