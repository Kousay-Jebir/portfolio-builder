import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserProfileSchema, UserProfile } from './entities/user-profile.entity';
import { TokenModule } from '@portfolio-builder/shared';
import { UserProfileService } from './user-profile.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: UserProfile.name, schema: UserProfileSchema },]),TokenModule],

  providers: [UserProfileService],
  controllers: [],
  exports:[UserProfileService]
})
export class UserModule {}
