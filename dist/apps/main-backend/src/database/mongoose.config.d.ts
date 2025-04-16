import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
export declare const mongooseConfig: (configService: ConfigService) => Promise<MongooseModuleOptions>;
