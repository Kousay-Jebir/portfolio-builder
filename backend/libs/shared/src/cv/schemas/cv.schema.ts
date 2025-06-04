import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/entities/user.entity';

export type CvDocument = Cv & Document;

@Schema({timestamps:true})
export class Cv {

  @Prop({ required: false})
  title: string;

  @Prop({required:true})
  filename:string


  @Prop({required:true})
  path : string;

  
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User | Types.ObjectId | any;
}

export const CvSchema = SchemaFactory.createForClass(Cv);
