import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/entities/user.entity';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {

  @Prop()
  message : string
 
  @Prop({ type: Types.ObjectId, ref: 'UserProfile' })
  viewer: User | Types.ObjectId | string;
  @Prop({ type: Types.ObjectId, ref: 'UserProfile' })
  receiver: User | Types.ObjectId | string;

  @Prop({ type: Types.ObjectId, ref: 'Portfolio' })
  portfolio: User | Types.ObjectId | string;

  @Prop({type:Boolean,default:false})
  seen : boolean

  @Prop({ default: Date.now })
  createdAt: Date;


}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
