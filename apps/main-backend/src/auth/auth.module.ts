import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { GoogleStrategy } from './strategy/google.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { BlacklistedToken, BlacklistedTokenSchema } from '../token/entity/blacklisted-token.entity';
import { BlacklistedTokenService } from '../token/services/blacklisted-token.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { BlacklistGuard } from './guard/blacklist.guard';
import { TokenModule } from '../token/token.module';

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
    }),MongooseModule.forFeature([{ name: BlacklistedToken.name, schema: BlacklistedTokenSchema }]), UserModule,TokenModule
   
  ],
  providers: [AuthService, JwtStrategy,GoogleStrategy,BlacklistedTokenService,BlacklistGuard],
  exports: [AuthService,BlacklistedTokenService],
  controllers: [AuthController],
})
export class AuthModule {}