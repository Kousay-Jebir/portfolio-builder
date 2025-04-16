import { Controller, Get } from '@nestjs/common';
import { BuilderAppService } from './builder-app.service';

@Controller()
export class BuilderAppController {
  constructor(private readonly builderAppService: BuilderAppService) {}

  @Get()
  getHello(): string {
    return this.builderAppService.getHello();
  }
}
