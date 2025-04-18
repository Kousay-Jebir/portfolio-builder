import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from '@portfolio-builder/shared';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { GoogleStrategy } from './strategy/google.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from '@portfolio-builder/shared';
import { BlacklistGuard } from '@portfolio-builder/shared';
import { TokenModule } from '@portfolio-builder/shared';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET') || 'secretKey',
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }), UserModule,TokenModule
   
  ],
  providers: [AuthService, JwtStrategy,GoogleStrategy,BlacklistGuard],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}