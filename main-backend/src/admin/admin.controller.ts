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

}
