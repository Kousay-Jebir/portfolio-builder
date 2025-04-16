import { Document } from 'mongoose';
import { UserRole } from '../../enum/user-role.enum';
export type UserDocument = User & Document;
export declare class User {
    googleId: string;
    username: string;
    email: string;
    password: string;
    salt: string;
    role: UserRole;
    createdAt: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
