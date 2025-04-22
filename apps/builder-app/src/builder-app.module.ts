import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BuilderAppController } from './builder-app.controller';
import { mongooseConfig, PortfolioModule, SharedModule, SwaggerModule, TokenModule } from '@portfolio-builder/shared';
import { BuilderAppService } from './builder-app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildCvModule } from './cv/build-cv.module';
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
    BuildCvModule
  ],
  controllers: [BuilderAppController],
  providers: [BuilderAppService], // Only provide what you actually use
})
export class BuilderAppModule {}