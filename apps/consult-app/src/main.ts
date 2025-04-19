import { NestFactory } from '@nestjs/core';
import { ConsultAppModule } from './consult-app.module';
import { SwaggerDocumentationService } from '@portfolio-builder/shared';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ConsultAppModule);
  app.setGlobalPrefix('consulting');
  app.useGlobalPipes(new ValidationPipe({transform:true,whitelist:true})); 
    const swaggerService = app.get(SwaggerDocumentationService);
    swaggerService.setup(app,'consulting backend');
    app.enableCors({
      origin: '*', 
      methods: '*',
      credentials: true, 
    });
  await app.listen(process.env.PORT_CONSULT??3002);
}
bootstrap();
