import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CvModule, CvService, PortfolioModule } from '@portfolio-builder/shared';
import { BuildCvController } from './build-cv.controller';
import { BuildCvService } from './build-cv.service';

@Module({
    imports:[CvModule,PortfolioModule],
    providers:[BuildCvService],
    controllers:[BuildCvController]
})
export class BuildCvModule {}
