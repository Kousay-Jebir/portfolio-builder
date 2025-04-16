import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';

import { UserService } from '../user/user.service';
import { UserLoginDto } from '../user/dto/user-login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,private readonly authService : AuthService,private readonly userService : UserService) {}

}
