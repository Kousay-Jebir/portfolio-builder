import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { SubscriptionType } from '@portfolio-builder/shared';

export type SubscriptionDocument = Subscription & Document;

@Schema({timestamps:true})
export class Subscription {

    @Prop({required:true})
    title : string ; 

    @Prop({type:String,enum:SubscriptionType,required:true})
    type : string

    @Prop()
    price : number


    @Prop({ default: Date.now })
    createdAt: Date;
    @Prop({ required: true })
    deleteAt: Date;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: string;

  
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);

SubscriptionSchema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 });