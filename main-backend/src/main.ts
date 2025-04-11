import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocumentationService } from './api-documentation/swagger/swagger-documentation.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform:true,whitelist:true})); 
  const swaggerService = app.get(SwaggerDocumentationService);
  swaggerService.setup(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
