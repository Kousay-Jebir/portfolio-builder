import { Body, Controller, NotFoundException, Post, Req,Get, UseGuards, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserProfileService } from '@portfolio-builder/shared';
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
    constructor(private readonly userService : UserService,private readonly profileService : UserProfileService){}

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

    @UseGuards(JwtAuthGuard,BlacklistGuard)
    @ApiBearerAuth('JWT-auth')
    @Get(':userId/subscription')
    async getSubscription(@Param('userId')userId :string){
      const user = await this.userService.findById(userId)
      if(!user){throw new NotFoundException('user not found')}
      return user.role

    }
    @UseGuards(JwtAuthGuard,BlacklistGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('profile')
    async getProfile(@ConnectedUser()user :any){
      return await this.profileService.findByCriteria({user:user.id})

    }



  
}


