import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedUserModule, User, UserSchema } from '@portfolio-builder/shared';
import { AuthModule } from '../auth/auth.module';
import { UserProfileSchema, UserProfile } from '@portfolio-builder/shared';
import { TokenModule } from '@portfolio-builder/shared';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: UserProfile.name, schema: UserProfileSchema },]),TokenModule,SharedUserModule],

  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
