import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { BaseService } from 'src/services/base.service';
import { Admin, AdminDocument } from './entities/admin.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminLoginDto } from './dto/login-admin.dto';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AdminService extends BaseService<AdminDocument> {
  constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>){
    super(adminModel)
  }
  
      async findAdmin(adminLoginDto:AdminLoginDto){
          const admin = await this.adminModel.findOne({identifiant:adminLoginDto.identifiant}).exec();
          if(admin){
              const isMatch = await bcrypt.compare(adminLoginDto.key,admin.key)
              if(isMatch){
                  return {id:admin._id,identifiant:admin.identifiant}
              }
              else{
                  throw new NotFoundException("bad credentials")
              }
          }
          else{
              throw new NotFoundException("bad credentials")
          }
      }
      async createAdmin (createAdminDto : CreateAdminDto):Promise<Admin>{
              const {identifiant,key}=createAdminDto
              const salt = await bcrypt.genSalt();
              const hashedPass=await bcrypt.hash(key,salt)
              const createdAdmin = new this.adminModel({identifiant:identifiant,key:hashedPass,salt:salt})
              return createdAdmin.save();
            
              
      
          }
  // create(createAdminDto: CreateAdminDto) {
  //   return 'This action adds a new admin';
  // }

  // findAll() {
  //   return `This action returns all admin`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} admin`;
  // }

  // update(id: number, updateAdminDto: UpdateAdminDto) {
  //   return `This action updates a #${id} admin`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} admin`;
  // }
}
