import { Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IApiDocumentation } from '../api-documentation.interface';
import { INestApplication } from '@nestjs/common';

@Injectable()
export class SwaggerDocumentationService implements IApiDocumentation {
    constructor(private readonly app: INestApplication) { }

    setup(): void {
        const config = new DocumentBuilder()
            .setTitle('Portfolio builder')
            .setDescription('web api documentation for portfolio-builder app')
            .setVersion('1.0')
            .build();
        const document = SwaggerModule.createDocument(this.app, config);
        SwaggerModule.setup('api/docs', this.app, document);
    }
}
