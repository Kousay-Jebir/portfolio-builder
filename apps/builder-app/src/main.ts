import { NestFactory } from '@nestjs/core';
import { BuilderAppModule } from './builder-app.module';
import { SwaggerDocumentationService } from '@portfolio-builder/shared';

async function bootstrap() {
  const app = await NestFactory.create(BuilderAppModule);
  const swaggerService = app.get(SwaggerDocumentationService);
  swaggerService.setup(app, 'Builder Backend');
  await app.listen(process.env.PORT_BUILD??3001);
}
bootstrap();
