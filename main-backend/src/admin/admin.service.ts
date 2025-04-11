import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { BaseService } from 'src/services/base.service';
import { Admin, AdminDocument } from './entities/admin.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AdminService extends BaseService<AdminDocument> {
  constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>){
    super(adminModel)
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
