import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerDocumentationService } from './api-documentation/swagger/swagger-documentation.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerService = app.get(SwaggerDocumentationService);
  swaggerService.setup();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
