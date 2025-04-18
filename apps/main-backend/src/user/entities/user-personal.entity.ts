import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.entity'; 

export type UserDataDocument = UserPersonalData & Document;

@Schema()
export class UserPersonalData {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User; 

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;
  @Prop()
  bio : string 
  @Prop()
  image : string

}

export const UserDataSchema = SchemaFactory.createForClass(UserPersonalData);
