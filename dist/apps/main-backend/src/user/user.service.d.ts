import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { PersonalDataDto } from './dto/personal-data.dto';
import { UserPersonalData, UserDataDocument } from './entities/user-personal.entity';
import { BaseService } from '../services/base.service';
export declare class UserService extends BaseService<UserDocument> {
    private userModel;
    private userDataModel;
    constructor(userModel: Model<UserDocument>, userDataModel: Model<UserDataDocument>);
    createUser(createUserDto: CreateUserDto): Promise<Partial<User>>;
    createPersonalData(personalDataDto: PersonalDataDto, user: any): Promise<import("mongoose").Document<unknown, {}, UserDataDocument> & UserPersonalData & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findUser(userLoginDto: UserLoginDto): Promise<{
        username: string;
        id: unknown;
        email: string;
        role: import("../enum/user-role.enum").UserRole;
    }>;
    findByGoogleId(googleId: string): Promise<(import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    createUserFromGoogle(profile: {
        googleId: string;
        email: string;
        name: string;
    }): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
