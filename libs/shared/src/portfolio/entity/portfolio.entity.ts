import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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
    userId: string;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
