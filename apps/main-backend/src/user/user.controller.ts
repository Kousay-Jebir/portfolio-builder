import { Body, Controller, NotFoundException, Post, Req,Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { PersonalDataDto } from './dto/personal-data.dto';
import { ConnectedUser } from '../decorator/user.decorator';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from '../decorator/role.decorator';
import { UserRole } from '../enum/user-role.enum';
import { BlacklistGuard } from '../auth/guard/blacklist.guard';
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}

    @UseGuards(JwtAuthGuard,BlacklistGuard)
    @ApiBearerAuth('JWT-auth')

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


