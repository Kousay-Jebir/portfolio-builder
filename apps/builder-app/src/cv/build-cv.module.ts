import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CvModule, CvService, PdfService, PortfolioModule, SharedModule, SwaggerModule, TokenModule } from '@portfolio-builder/shared';
import { BuildCvController } from './build-cv.controller';
import { BuildCvService } from './build-cv.service';

@Module({
    imports:[CvModule,PortfolioModule,TokenModule, SharedModule,SwaggerModule,],
    providers:[BuildCvService,PdfService],
    controllers:[BuildCvController]
})
export class BuildCvModule {}
