import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    login(user: any): Promise<{
        status: string;
        message: string;
        access_token: string;
        data: {
            username: any;
            id: any;
            email: any;
            role: any;
        };
    }>;
    validateOrCreateGoogleUser(profile: {
        googleId: string;
        email: string;
        name: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../user/entities/user.entity").UserDocument> & import("../user/entities/user.entity").User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
