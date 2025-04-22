import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { SharedService } from './shared.service';
import { RolesGuard } from './guards/role.guard';
import { CvModule } from './cv/cv.module';

@Module({
  imports: [ConfigModule.forRoot(), CvModule],
  providers: [JwtStrategy, JwtAuthGuard,SharedService,RolesGuard],
  exports: [JwtStrategy, JwtAuthGuard,RolesGuard],
})
export class SharedModule {}