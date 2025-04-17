import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { BuilderAppService } from './builder-app.service';
import { JwtAuthGuard, Roles, RolesGuard } from '@portfolio-builder/shared';
import { ConnectedUser } from '@portfolio-builder/shared';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';



@Controller('builder')
@ApiTags('builder')
export class BuilderAppController {
  constructor(private readonly builderAppService: BuilderAppService) {}
  @UseGuards(JwtAuthGuard,RolesGuard)

  @ApiBearerAuth('JWT-auth')

  @Roles('admin')

  
  @Get()
  getHello(): string {
    return this.builderAppService.getHello();
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  
  @Get('connectedUser')
  async getUser(@ConnectedUser() user : any) {
    return user;
  }

}
