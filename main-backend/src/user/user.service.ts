import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { UserLoginDto } from './dto/user-login.dto';
import { PersonalDataDto } from './dto/personal-data.dto';
import { UserPersonalData , UserDataDocument } from './entities/user-personal.entity';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel : Model<UserDocument>, @InjectModel(UserPersonalData.name) private userDataModel: Model<UserDataDocument>,){}


    async create (createUserDto : CreateUserDto):Promise<User>{
        const {username,email,password}=createUserDto
        const salt = await bcrypt.genSalt();
        const hashedPass=await bcrypt.hash(password,salt)
        const createdUser = new this.userModel({username,email,password:hashedPass,salt:salt})
        return createdUser.save();
      
        

    }
    async createPersonalData(personalDataDto : PersonalDataDto,user:any){
        const email = user.email
        const findUser= await this.userModel.findOne({email:email})
        if(findUser){
            const newUserData = new this.userDataModel({
                ...personalDataDto,
                user: findUser._id, 
              });
            return newUserData.save()
        }
        else{
            throw new NotFoundException('not found')
        }
       
    }

    async findUser(userLoginDto:UserLoginDto){
        const user = await this.userModel.findOne({email:userLoginDto.email}).exec();
        if(user){
            const isMatch = await bcrypt.compare(userLoginDto.password,user.password)
            if(isMatch){
                return {username:user.username,id:user._id,email:user.email}
            }
            else{
                throw new NotFoundException("bad credentials")
            }
        }
        else{
            throw new NotFoundException("bad credentials")
        }
    }

}
