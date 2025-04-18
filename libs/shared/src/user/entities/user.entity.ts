import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from '../../enum/user-role.enum';
import { UserProfile } from './user-profile.entity';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  googleId : string
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({required:false})
  salt : string
  @Prop({type:String, enum:UserRole,default:UserRole.User})
  role : UserRole


  @Prop({ default: Date.now })
  createdAt: Date;
  
  @Prop({ type: Types.ObjectId, ref: 'UserProfile' })
  profile: UserProfile | Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
