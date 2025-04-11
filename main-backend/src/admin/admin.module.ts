import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './entities/admin.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
