import { Module } from '@nestjs/common';
import { ConsultAppController } from './consult-app.controller';
import { ConsultAppService } from './consult-app.service';

@Module({
  imports: [],
  controllers: [ConsultAppController],
  providers: [ConsultAppService],
})
export class ConsultAppModule {}
