import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BuilderAppController } from './builder-app.controller';
import { SharedModule, SwaggerModule } from '@portfolio-builder/shared';
import { BuilderAppService } from './builder-app.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
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
    SwaggerModule
  ],
  controllers: [BuilderAppController],
  providers: [BuilderAppService], // Only provide what you actually use
})
export class BuilderAppModule {}