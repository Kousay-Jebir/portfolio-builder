import { IApiDocumentation } from '../api-documentation.interface';
import { INestApplication } from '@nestjs/common';
export declare class SwaggerDocumentationService implements IApiDocumentation {
    setup(app: INestApplication): void;
}
