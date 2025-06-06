import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  BlacklistGuard,
  ConnectedUser,
  JwtAuthGuard,
} from '@portfolio-builder/shared';
import axios from 'axios';
import { BuildCvService } from './build-cv.service';
import { CreatePortfolioDto } from '../dto/create-portfolio.dto';
import { CvDataDto } from '../dto/cv-data.dto';
import { CreateCvDto } from '../dto/create-cv.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('cv')
@ApiTags('cv')
export class BuildCvController {
  constructor(private readonly buildCvService: BuildCvService) {}
  @UseGuards(JwtAuthGuard, BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('portfolio/:id/questions')
  async analysePortfolio(
    @ConnectedUser() user: any,
    @Param('id') portfolioId: string,
  ) {
    return await this.buildCvService.getQuestions(portfolioId, user.id);
  }
  @UseGuards(JwtAuthGuard, BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('generate/portfolio/:portfolioId')
  async generateCv(@ConnectedUser() user:any,@Param('portfolioId')portfolioId : string,@Body()cvDataDto : Partial<CvDataDto>){

    return Object.keys(cvDataDto).length === 0?await this.buildCvService.generateCv(user.id,portfolioId): await this.buildCvService.generateCv(user.id,portfolioId,cvDataDto)

    


  }
  @UseGuards(JwtAuthGuard, BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Post()
  async createCv(@Body() createCvDto : CreateCvDto,@ConnectedUser() user : any){
    return await this.buildCvService.createCv(createCvDto,user.id)

  }

  @UseGuards(JwtAuthGuard, BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'The uploaded file',
        },
      },
      required: ['file'],
    },
  })
  
  @UseInterceptors(FileInterceptor('file', {
          storage: diskStorage({
            destination: './public',
            filename: (req, file, cb) => {
              cb(null, `${Date.now()}-${file.originalname}`);
            },
          }),
        }),
      )
  async uploadCv(@UploadedFile() file: Express.Multer.File,@ConnectedUser() user : any){
    const filePath = `/public/${file.filename}`
    return await this.buildCvService.createCv({path:filePath,filename:file.filename},user.id)

  }


  @UseGuards(JwtAuthGuard, BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Get()
  async getCv(@ConnectedUser() user : any):Promise<String>{
    return await this.buildCvService.getCv(user.id)


  }

    @UseGuards(JwtAuthGuard, BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('user/:userId')
  async getCvByUser(@Param('userId') userId : string):Promise<String>{
    return await this.buildCvService.getCv(userId)


  }




}
