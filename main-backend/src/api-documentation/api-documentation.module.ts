import { Module } from '@nestjs/common';
import { SwaggerDocumentationService } from './swagger/swagger-documentation.service';
import { SwaggerModule } from '@nestjs/swagger';

@Module({
  providers: [SwaggerDocumentationService],
  exports: [SwaggerDocumentationService]
})
export class ApiDocumentationModule { }
