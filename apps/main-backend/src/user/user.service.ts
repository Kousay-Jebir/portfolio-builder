import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from '@portfolio-builder/shared';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { UserLoginDto } from './dto/user-login.dto';
import {CreateProfileDto} from './dto/create-profile.dto';
import { UserProfile , UserProfileDocument } from '@portfolio-builder/shared';
import { BaseService } from '@portfolio-builder/shared';

@Injectable()
export class UserService extends BaseService<UserDocument>{

    constructor(@InjectModel(User.name) private userModel : Model<UserDocument>, @InjectModel(UserProfile.name) private userPortfolioModel: Model<UserProfileDocument>,){
        super(userModel)
    }


    async createUser (createUserDto : CreateUserDto):Promise<Partial<User>>{
        console.log(createUserDto)
        const {username,email,password}=createUserDto
        const salt = await bcrypt.genSalt();
        const hashedPass=await bcrypt.hash(password,salt)
        const createdUser = new this.userModel({username:username,email,password:hashedPass,salt:salt})
        const user = await createdUser.save();
      return {username:user.username,email:user.email,role:user.role}
        

    }
    async createProfileData(createProfileDto : CreateProfileDto,user:string,path:string){
       
        const profile = await this.userPortfolioModel.create({...createProfileDto,profilePicture:path,user:user})
        const saved= await profile.save()
        await this.userModel.findByIdAndUpdate(user, { profile: saved._id });

        return saved
        
     
       
    }

    async findUser(userLoginDto:UserLoginDto){
        const user = await this.userModel.findOne({email:userLoginDto.email}).exec();
        if(user){
            const isMatch = await bcrypt.compare(userLoginDto.password,user.password)
            if(isMatch){
                return {username:user.username,id:user._id,email:user.email,role : user.role}
            }
            else{
                throw new NotFoundException("bad credentials")
            }
        }
        else{
            throw new NotFoundException("bad credentials")
        }
    }
    async findByGoogleId(googleId: string) {
        return this.userModel.findOne({ googleId });
      }
      
      async createUserFromGoogle(profile: { googleId: string; email: string; name: string }) {
        return this.userModel.create({
          googleId: profile.googleId,
          email: profile.email,
          username: profile.name,
          role: 'user', 
        });
      }

    
      

}
