import { NestFactory } from '@nestjs/core';
import { BuilderAppModule } from './builder-app.module';

async function bootstrap() {
  const app = await NestFactory.create(BuilderAppModule);
  await app.listen(3001);
}
bootstrap();
