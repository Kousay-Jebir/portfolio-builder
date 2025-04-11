import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  @Prop({ required: true })
  identifiant: string;

  @Prop({ required: true })
  key: string;


  @Prop({required:true})
  salt : string


  
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
