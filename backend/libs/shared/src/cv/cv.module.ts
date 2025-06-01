import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cv, CvSchema } from './schemas/cv.schema';
import { CvService } from './cv.service';

@Module({
    imports:[MongooseModule.forFeature([{ name: Cv.name, schema: CvSchema}])],
    providers:[CvService],
    exports:[CvService]
})
export class CvModule {}
