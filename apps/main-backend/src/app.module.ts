import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule, mongooseConfig } from '@portfolio-builder/shared'; 

import { SwaggerModule, TokenModule } from '@portfolio-builder/shared';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriptionModule } from './subscription/subscription.module';
import { MainEventModule } from './sse/main-event.module';
import { AuthPublicMiddleware } from './auth/middleware/public-auth.middleware';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mongooseConfig,
      inject: [ConfigService],
    }),
    SwaggerModule,
    AuthModule,
    UserModule,
    AdminModule,
    SubscriptionModule,
    TokenModule,
    MainEventModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService,JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthPublicMiddleware)
      .forRoutes('/public'); 
  }
}
