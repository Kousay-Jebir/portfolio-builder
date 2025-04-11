import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { AdminLoginDto } from './dto/login-admin.dto';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,private readonly authService : AuthService) {}

  @Post('login')
  async adminLogin(@Body() adminLoginDto : AdminLoginDto){
      const admin = await this.adminService.findAdmin(adminLoginDto)
      console.log(admin)
            if(admin){
                return this.authService.adminLogin(admin)
    
            }
            else{throw new NotFoundException("bad credentials")}
  }

  @Post('register')
  async create(@Body() createAdminDto: CreateAdminDto) {
    console.log(createAdminDto)
    return await this.adminService.createAdmin(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id,updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.delete(id);
  }
}
