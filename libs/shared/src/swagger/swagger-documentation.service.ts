import { Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IApiDocumentation } from './api-documentation.interface';
import { INestApplication } from '@nestjs/common';

@Injectable()
export class SwaggerDocumentationService implements IApiDocumentation {
  setup(app: INestApplication, appName?: string): void {
    const config = new DocumentBuilder()
      .setTitle(`Portfolio builder - ${appName || 'API'}`)
      .setDescription('Web API documentation for portfolio-builder app')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      // .addCookieAuth('pay_token', {
      //   type: 'apiKey',
      //   in: 'cookie',
      //   name: 'pay_token',
      // })
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        withCredentials: true,
      },
    });
  }
}