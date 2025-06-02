import { Body, Controller, Get, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ConsultUserService } from './consult-user.service';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BlacklistGuard, ConnectedUser, JwtAuthGuard } from '@portfolio-builder/shared';
import { PaginationDto } from 'libs/shared/src/pagination/dto/pagination.dto';
import { NotFoundError } from 'rxjs';
@ApiTags('users')
@Controller('users')
export class ConsultUserController {
constructor(private readonly consultUserService : ConsultUserService){}
  @UseGuards(JwtAuthGuard,BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
   
  @Get()
  async getUsers(@Query() pagination : PaginationDto) {
    return await this.consultUserService.getUsersWithPortfolio(pagination);
  }
@UseGuards(JwtAuthGuard,BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Get(':id/portfolios')
  async getPotfolios(@Param('id') id: string) {
    return await this.consultUserService.getUserPortfolios(id);
  }
  @UseGuards(JwtAuthGuard,BlacklistGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('search')
  async search(@Body() pagination :PaginationDto,@ConnectedUser() user : any){
    if(!pagination.field){
      throw new NotFoundException()
    }
    await this.consultUserService.search(user.id,pagination.field,)
    return await this.consultUserService.getUsersWithPortfolio({field:pagination.field})

  }
}
