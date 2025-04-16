import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocumentationService } from './api-documentation/swagger/swagger-documentation.service';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({transform:true,whitelist:true})); 
  const swaggerService = app.get(SwaggerDocumentationService);
  swaggerService.setup(app);
  app.enableCors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  });
  await app.listen(3000);
}
bootstrap();
