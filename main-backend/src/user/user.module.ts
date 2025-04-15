import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserDataSchema, UserPersonalData } from './entities/user-personal.entity';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: UserPersonalData.name, schema: UserDataSchema },]),TokenModule],

  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
