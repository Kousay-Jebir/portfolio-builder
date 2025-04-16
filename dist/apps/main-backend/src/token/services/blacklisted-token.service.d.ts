import { BlacklistedToken, BlacklistedTokenDocument } from "../entity/blacklisted-token.entity";
import { Model } from "mongoose";
export declare class BlacklistedTokenService {
    private blacklistedTokenModel;
    constructor(blacklistedTokenModel: Model<BlacklistedTokenDocument>);
    blacklistToken(token: string): Promise<import("mongoose").Document<unknown, {}, BlacklistedTokenDocument> & BlacklistedToken & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    isBlacklisted(token: string): Promise<(import("mongoose").Document<unknown, {}, BlacklistedTokenDocument> & BlacklistedToken & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
