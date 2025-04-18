import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.entity'; 

export type UserProfileDocument = UserProfile & Document;


@Schema({ timestamps: true })
export class UserProfile extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User | Types.ObjectId;

  @Prop()
  bio: string;

  @Prop()
  profilePicture: string;

  @Prop()
  location: string;

  @Prop()
  status: string;

 

  @Prop({
    type: [
      {
        type: { type: String },
        value: String,
      },
    ],
    default: [],
  })
  contacts: any[];

  @Prop({
    type: {
      github: String,
      linkedin: String,
      twitter: String,
      personalSite: String,
    },
    default: {},
  })
  socialLinks: Record<string, string>;

  @Prop({ default: 'public' })
  visibility: string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
