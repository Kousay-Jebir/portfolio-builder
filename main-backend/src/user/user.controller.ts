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
import { AdminGuard } from 'src/auth/jwt-auth.guard/admin.guard';
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService, private authService : AuthService){}

    @Post('register')
    async register (@Body() createUserDto: CreateUserDto):Promise<User>{

        return await this.userService.createUser(createUserDto)

    }
  
     
    @Post('login')
    async login (@Body()userLoginDto : UserLoginDto){
        const user = await this.userService.findUser(userLoginDto)
        if(user){
            return this.authService.login(user)

        }
        else{throw new NotFoundException("bad credentials")}
    }
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')

    @Get()
    async getConnectedUser(@Req() req:Request,@ConnectedUser() user : Partial<User>){

        return user

    }
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('JWT-auth')
    @Post()
    async addPersonalData(@Req() req:Request,@Body() personalDataDto:PersonalDataDto){
        const user = req.user
        return await this.userService.createPersonalData(personalDataDto,user)
    }
}


