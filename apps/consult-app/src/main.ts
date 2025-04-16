import { NestFactory } from '@nestjs/core';
import { ConsultAppModule } from './consult-app.module';

async function bootstrap() {
  const app = await NestFactory.create(ConsultAppModule);
  await app.listen(process.env.PORT_CONSULT??3002);
}
bootstrap();
