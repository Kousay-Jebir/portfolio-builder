import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BuilderAppService } from './builder-app.service';
import {
  BlacklistGuard,
  JwtAuthGuard,
  Roles,
  RolesGuard,
} from '@portfolio-builder/shared';
import { ConnectedUser } from '@portfolio-builder/shared';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';

@Controller()
@ApiTags()
export class BuilderAppController {
  constructor(private readonly builderAppService: BuilderAppService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Roles('admin')
  @Get()
  getHello(): string {
    return this.builderAppService.getHello();
  }
  @UseGuards(JwtAuthGuard, BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('connectedUser')
  async getUser(@ConnectedUser() user: any) {
    return user;
  }

  @UseGuards(JwtAuthGuard, BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('save')
  async savePortfolio(
    @Body() createPortfolioDto: CreatePortfolioDto,
    @ConnectedUser() user: any,
  ) {
    return await this.builderAppService.createPortfolio(
      createPortfolioDto,
      user.id,
    );
  }

  
  
}
