import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { SharedService } from './shared.service';
import { RolesGuard } from './guards/role.guard';
import { CvModule } from './cv/cv.module';
import { MailModule } from './mail/mail.module';
import { AggregationService } from './services/aggregation.service';

@Module({
  imports: [ConfigModule.forRoot(), CvModule, MailModule],
  providers: [JwtStrategy, JwtAuthGuard,SharedService,RolesGuard,AggregationService],
  exports: [JwtStrategy, JwtAuthGuard,RolesGuard,AggregationService],
})
export class SharedModule {}