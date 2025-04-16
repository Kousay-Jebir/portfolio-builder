import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { BuilderAppService } from './builder-app.service';
import { JwtAuthGuard } from '@portfolio-builder/shared';
import { ConnectedUser } from '@portfolio-builder/shared';



@Controller()
export class BuilderAppController {
  constructor(private readonly builderAppService: BuilderAppService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.builderAppService.getHello();
  }
  @UseGuards(JwtAuthGuard)
  @Get('connectedUser')
  async getUser(@ConnectedUser() user : any) {
    return user;
  }

}
