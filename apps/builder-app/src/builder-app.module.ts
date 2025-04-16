import { Module } from '@nestjs/common';
import { BuilderAppController } from './builder-app.controller';
import { BuilderAppService } from './builder-app.service';

@Module({
  imports: [],
  controllers: [BuilderAppController],
  providers: [BuilderAppService],
})
export class BuilderAppModule {}
