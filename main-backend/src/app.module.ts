import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiDocumentationModule } from './api-documentation/api-documentation.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_URI'),
    }),
    inject: [ConfigService], 
  }),ApiDocumentationModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
