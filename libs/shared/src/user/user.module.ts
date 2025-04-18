import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserDataSchema, UserPersonalData } from './entities/user-personal.entity';
import { TokenModule } from '@portfolio-builder/shared';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: UserPersonalData.name, schema: UserDataSchema },]),TokenModule],

  providers: [],
  controllers: [],
  exports:[]
})
export class UserModule {}
