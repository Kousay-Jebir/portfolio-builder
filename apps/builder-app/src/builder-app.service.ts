import { Injectable } from '@nestjs/common';

@Injectable()
export class BuilderAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
