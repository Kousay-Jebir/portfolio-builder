import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ActivityTypeEnum } from '../enum/activity-type.enum';
import { User } from '@portfolio-builder/shared';

export type ActivityLogDocument = ActivityLog & Document;

@Schema({ timestamps: true })
export class ActivityLog {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId | string | User;

  @Prop({ required: true,type:String,enum:ActivityTypeEnum })
  type: ActivityTypeEnum;

  @Prop({ type: Object })
  metadata: Record<string, any>;
}

export const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog);
