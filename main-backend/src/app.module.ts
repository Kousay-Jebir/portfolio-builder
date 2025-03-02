import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiDocumentationModule } from './api-documentation/api-documentation.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://127.0.0.1:27018/ppp?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1'),ApiDocumentationModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
