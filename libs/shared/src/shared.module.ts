import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { SharedService } from './shared.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [JwtStrategy, JwtAuthGuard,SharedService],
  exports: [JwtStrategy, JwtAuthGuard,SharedService],
})
export class SharedModule {}