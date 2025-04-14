import { Body, Controller, NotFoundException, Post, Req,Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard/jwt-auth.guard';
import { PersonalDataDto } from './dto/personal-data.dto';
import { ConnectedUser } from 'src/decorator/user.decorator';
import { RolesGuard } from 'src/auth/jwt-auth.guard/role.guard';
import { Roles } from 'src/decorator/role.decorator';
import { UserRole } from 'src/enum/user-role.enum';
import { BlacklistGuard } from 'src/auth/jwt-auth.guard/blacklist.guard';
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


