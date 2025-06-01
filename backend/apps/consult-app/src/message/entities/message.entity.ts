import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '@portfolio-builder/shared';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {

  @Prop()
  content : string
 
  @Prop({ type: Types.ObjectId, ref: 'UserProfile' })
  sender: User | Types.ObjectId | string;
  @Prop({ type: Types.ObjectId, ref: 'UserProfile' })
  receiver: User | Types.ObjectId | string;

  @Prop({type:Boolean,default:false})
  seen : boolean

  @Prop({ default: Date.now })
  createdAt: Date;


}

export const MessageSchema = SchemaFactory.createForClass(Message);
