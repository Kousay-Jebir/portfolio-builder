import { Body, Controller, NotFoundException, Post, Req,Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { JwtAuthGuard } from '@portfolio-builder/shared';
import { PersonalDataDto } from './dto/personal-data.dto';
import { RolesGuard } from '@portfolio-builder/shared';
import { Roles } from '@portfolio-builder/shared';
import { UserRole } from '../enum/user-role.enum';
import { BlacklistGuard } from '@portfolio-builder/shared';
import { ConnectedUser } from '@portfolio-builder/shared';
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}

    @UseGuards(JwtAuthGuard,BlacklistGuard,RolesGuard)
    @ApiBearerAuth('JWT-auth')
    @Roles('admin')

    @Get()
    async getConnectedUser(@Req() req:Request,@ConnectedUser() user : any){

        return user

    }
    
    @Post()
    async addPersonalData(@Req() req:Request,@Body() personalDataDto:PersonalDataDto){
        const user = req.user
        return await this.userService.createPersonalData(personalDataDto,user)
    }
}


