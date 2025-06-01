import { Body, Controller, NotFoundException, Post, Req,Get, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@portfolio-builder/shared';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { JwtAuthGuard } from '@portfolio-builder/shared';
import { CreateProfileDto } from './dto/create-profile.dto';
import { RolesGuard } from '@portfolio-builder/shared';
import { Roles } from '@portfolio-builder/shared';
import { UserRole } from '@portfolio-builder/shared';
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
    async addPersonalData(@UploadedFile() file: Express.Multer.File,@Body() createProfileDto:CreateProfileDto,@ConnectedUser() user : any){
        const filePath=`/uploads/${file.filename}`
        return await this.userService.createProfileData(createProfileDto,user.id,filePath)
    }
}


