import { Document, Types } from 'mongoose';
import { User } from './user.entity';
export type UserDataDocument = UserPersonalData & Document;
export declare class UserPersonalData {
    user: User;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
}
export declare const UserDataSchema: import("mongoose").Schema<UserPersonalData, import("mongoose").Model<UserPersonalData, any, any, any, Document<unknown, any, UserPersonalData> & UserPersonalData & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserPersonalData, Document<unknown, {}, import("mongoose").FlatRecord<UserPersonalData>> & import("mongoose").FlatRecord<UserPersonalData> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
