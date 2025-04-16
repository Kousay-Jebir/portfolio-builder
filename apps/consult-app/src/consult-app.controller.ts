import { Controller, Get } from '@nestjs/common';
import { ConsultAppService } from './consult-app.service';

@Controller()
export class ConsultAppController {
  constructor(private readonly consultAppService: ConsultAppService) {}

  @Get()
  getHello(): string {
    return this.consultAppService.getHello();
  }
}
