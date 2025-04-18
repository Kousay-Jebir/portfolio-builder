import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../../enum/user-role.enum';

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

  
}

export const UserSchema = SchemaFactory.createForClass(User);
