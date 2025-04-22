import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ConnectedUser,
} from '@portfolio-builder/shared';
import axios from 'axios';
import { BuildCvService } from './build-cv.service';

@Controller('cv')
@ApiTags('cv')
export class BuildCvController {
  constructor(
    private readonly buildCvService: BuildCvService,
  ) {}

  @Post('analyse/:id')
  async analysePortfolio(
    @ConnectedUser() user: any,
    @Param('id') portfolioId: string,
  ) {
    return await this.buildCvService.getQuestions(portfolioId,user.id)
  }
}
