import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiDocumentationModule } from './api-documentation/api-documentation.module';

@Module({
  imports: [ApiDocumentationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
