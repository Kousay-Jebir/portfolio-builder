import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SubscriptionType } from 'src/enum/subscription-type.enum';

export type SubscriptionDocument = Subscription & Document;

@Schema({timestamps:true})
export class Subscription {

    @Prop({required:true})
    title : string ; 

    @Prop({type:String,enum:SubscriptionType,required:true})
    type : SubscriptionType

    @Prop()
    price : number


    @Prop({ default: Date.now })
    createdAt: Date;
    @Prop({ required: true })
    deleteAt: Date;

    @Prop({ required: true })
    userId: string;

  
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);

SubscriptionSchema.index({ deleteAt: 1 }, { expireAfterSeconds: 0 });