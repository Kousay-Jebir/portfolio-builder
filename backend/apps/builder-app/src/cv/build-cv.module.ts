import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CvModule, CvService, PdfService, PortfolioModule, SharedModule, SharedUserModule, SwaggerModule, TokenModule } from '@portfolio-builder/shared';
import { BuildCvController } from './build-cv.controller';
import { BuildCvService } from './build-cv.service';
import { UserModule } from 'apps/main-backend/src/user/user.module';

@Module({
    imports:[CvModule,PortfolioModule,TokenModule, SharedModule,SwaggerModule,SharedUserModule],
    providers:[BuildCvService,PdfService],
    controllers:[BuildCvController]
})
export class BuildCvModule {}
