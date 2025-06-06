import { Body, Controller, Get, NotFoundException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserLoginDto } from '../user/dto/user-login.dto';
import { User } from '@portfolio-builder/shared';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly userService : UserService, private authService : AuthService){}
    @Post('register')
        async register (@Body() createUserDto: CreateUserDto):Promise<Partial<User>>{
    
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
        @Get('google')
        @UseGuards(AuthGuard('google'))
        async googleAuth() {
          // redirects to Google login
        }
        
        @Get('google/redirect')
        @UseGuards(AuthGuard('google'))
        async googleRedirect(@Req() req,@Res()res:Response) {
          const result=await this.authService.login(req.user);
          const token = result.access_token;
          res.redirect(`http://localhost:5173/google-redirect?token=${token}`);


        
        
        
        }
}
