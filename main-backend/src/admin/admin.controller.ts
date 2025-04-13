import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';

import { UserService } from 'src/user/user.service';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,private readonly authService : AuthService,private readonly userService : UserService) {}

  // @Post('login')
  // async adminLogin(@Body() adminLoginDto : UserLoginDto){
  //     const admin = await this.userService.findUser(adminLoginDto)
  //     console.log(admin)
  //           if(admin){
  //               return this.authService.login(admin)
    
  //           }
  //           else{throw new NotFoundException("bad credentials")}
  // }

  // @Post('register')
  // async create(@Body() createAdminDto: CreateUserDto) {
  //   console.log(createAdminDto)
  //   return await this.userService.createUser(createAdminDto);
  // }

  // @Get()
  // findAll() {
  //   return this.adminService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminService.findById(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminDto: UserUpd) {
  //   return this.adminService.update(id,updateAdminDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminService.delete(id);
  // }
}
