import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
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
}
