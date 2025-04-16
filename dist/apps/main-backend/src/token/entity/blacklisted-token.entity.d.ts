import { Document } from 'mongoose';
export type BlacklistedTokenDocument = BlacklistedToken & Document;
export declare class BlacklistedToken {
    token: string;
    createdAt: Date;
}
export declare const BlacklistedTokenSchema: import("mongoose").Schema<BlacklistedToken, import("mongoose").Model<BlacklistedToken, any, any, any, Document<unknown, any, BlacklistedToken> & BlacklistedToken & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BlacklistedToken, Document<unknown, {}, import("mongoose").FlatRecord<BlacklistedToken>> & import("mongoose").FlatRecord<BlacklistedToken> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
