import { Module } from '@nestjs/common';
import { SwaggerDocumentationService } from './swagger/swagger-documentation.service';

@Module({
  providers: [SwaggerDocumentationService],
  exports: [SwaggerDocumentationService]
})
export class ApiDocumentationModule { }
