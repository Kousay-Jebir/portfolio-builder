import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';

import { UserService } from '../user/user.service';
import { UserLoginDto } from '../user/dto/user-login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ConnectedUser, JwtAuthGuard, Roles, RolesGuard } from '@portfolio-builder/shared';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,private readonly authService : AuthService,private readonly userService : UserService) {}
@UseGuards(JwtAuthGuard,RolesGuard)
@ApiBearerAuth('JWT-auth')

@Roles('admin')
@Get()
  async getAdmin(@ConnectedUser() user : any){
    return user
  }

}
