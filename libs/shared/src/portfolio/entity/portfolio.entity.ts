import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { UserProfile } from '../../user/entities/user-profile.entity';

export type PortfolioDocument = Portfolio & Document;

@Schema({timestamps:true})
export class Portfolio {
  
  @Prop({ required: true })
  code: string;

  @Prop({ type: Object, required: true })
  content: Record<string, any>; 

  
  @Prop({ default: Date.now })
  createdAt: Date;
  
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User | Types.ObjectId | string;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
