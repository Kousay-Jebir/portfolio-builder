import { NestFactory } from '@nestjs/core';
import { ConsultAppModule } from './consult-app.module';
import { SwaggerDocumentationService } from '@portfolio-builder/shared';

async function bootstrap() {
  const app = await NestFactory.create(ConsultAppModule);
  const swaggerService = app.get(SwaggerDocumentationService);
  swaggerService.setup(app, 'Consulting Backend');
  await app.listen(process.env.PORT_CONSULT??3002);
}
bootstrap();
