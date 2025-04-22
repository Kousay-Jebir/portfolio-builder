import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  BlacklistGuard,
  ConnectedUser,
  JwtAuthGuard,
} from '@portfolio-builder/shared';
import axios from 'axios';
import { BuildCvService } from './build-cv.service';
import { CreatePortfolioDto } from '../dto/create-portfolio.dto';
import { CvDataDto } from '../dto/cv-data.dto';

@Controller('cv')
@ApiTags('cv')
export class BuildCvController {
  constructor(private readonly buildCvService: BuildCvService) {}
  @UseGuards(JwtAuthGuard, BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('portfolio/:id')
  async analysePortfolio(
    @ConnectedUser() user: any,
    @Param('id') portfolioId: string,
  ) {
    return await this.buildCvService.getQuestions(portfolioId, user.id);
  }
  @Post('generate')
  async generateCv(@Body() cvDataDto : CvDataDto,@ConnectedUser() user:any){

    return await this.buildCvService.sendResponse(cvDataDto,user.id)
    


  }
}
