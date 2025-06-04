import { NestFactory } from '@nestjs/core';
import { BuilderAppModule } from './builder-app.module';
import { SwaggerDocumentationService } from '@portfolio-builder/shared';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(BuilderAppModule);
  app.setGlobalPrefix('builder');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const swaggerService = app.get(SwaggerDocumentationService);
  swaggerService.setup(app, 'Builder Backend');
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  await app.listen(process.env.PORT_BUILD ?? 3001);
}
bootstrap();
