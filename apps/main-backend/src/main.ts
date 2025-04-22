import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocumentationService } from '@portfolio-builder/shared';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';

import { join } from 'path';
import * as express from 'express'


async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({transform:true})); 
  const swaggerService = app.get(SwaggerDocumentationService);
  swaggerService.setup(app);
  app.enableCors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  });

  app.use('/public', express.static(join(process.cwd(), 'public')));
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  
  


  await app.listen(process.env.PORT_MAIN??3000);
}
bootstrap();
