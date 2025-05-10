import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.entity'; 
import { FieldTypeEnum } from '../../enum/field-type.enum';

export type UserProfileDocument = UserProfile & Document;


@Schema({ timestamps: true })
export class UserProfile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User | Types.ObjectId | string;

  @Prop()
  firstName:string
  @Prop()
  lastName:string

  @Prop()
  bio: string;

  @Prop()
  profilePicture: string;

  @Prop()
  location: string;

  @Prop({ type: String, enum: FieldTypeEnum, required: true })
  
  field: FieldTypeEnum;

 

  @Prop({
    type:Object,
    default: {},
  })
  contacts: Record<string, string>;

  @Prop({
    type:Object,
    default: {},
  })
  socialLinks: Record<string, string>;

  @Prop({ default: 'public' })
  visibility: string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
