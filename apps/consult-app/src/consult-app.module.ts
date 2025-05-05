import { Module } from '@nestjs/common';
import { ConsultAppController } from './consult-app.controller';
import { ConsultAppService } from './consult-app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventModule, mongooseConfig, NotificationModule, PaginationService, Portfolio, PortfolioModule, PortfolioSchema, SharedModule, SwaggerModule, TokenModule, User, UserProfile, UserProfileSchema, UserSchema } from '@portfolio-builder/shared';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConsultUserModule } from './user/consult-user.module';
import { ChatGateway } from './ws/chat.gateway';
import { MessageModule } from './message/message.module';
import { WsService } from './ws/chat.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: mongooseConfig,
          inject: [ConfigService],
        }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET') || 'secretKey',
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),
    SharedModule,
    SwaggerModule,
    TokenModule,
    PortfolioModule,
    NotificationModule,
    ConsultUserModule,
    MessageModule,
    EventModule,

    MongooseModule.forFeature([
      { name: Portfolio.name, schema: PortfolioSchema },
      { name: User.name, schema: UserSchema },
      {name : UserProfile.name,schema:UserProfileSchema}
    ]),
  ],
  controllers: [ConsultAppController],
  providers: [ConsultAppService,ChatGateway,WsService,PaginationService],
})
export class ConsultAppModule {}
