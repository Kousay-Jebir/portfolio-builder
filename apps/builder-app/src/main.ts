import { NestFactory } from '@nestjs/core';
import { BuilderAppModule } from './builder-app.module';

async function bootstrap() {
  const app = await NestFactory.create(BuilderAppModule);
  await app.listen(process.env.PORT_BUILD??3001);
}
bootstrap();
