import { Body, Controller, NotFoundException, Post, Req,Get, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
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
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
    @UseGuards(JwtAuthGuard,BlacklistGuard)
    @ApiBearerAuth('JWT-auth')
    @Post('profile')
    @ApiConsumes('multipart/form-data')

    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
          },
        }),
      }),
    )
    async addPersonalData(@UploadedFile() file: Express.Multer.File,@Body() personalDataDto:PersonalDataDto,@ConnectedUser() user : any){
        const filename='file'
        return await this.userService.createPersonalData(personalDataDto,user,filename)
    }
}


