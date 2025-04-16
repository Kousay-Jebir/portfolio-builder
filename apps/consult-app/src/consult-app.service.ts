import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsultAppService {
  getHello(): string {
    return 'Hello World From Consult!';
  }
}
