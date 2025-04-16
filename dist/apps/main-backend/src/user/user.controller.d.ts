import { UserService } from './user.service';
import { Request } from 'express';
import { PersonalDataDto } from './dto/personal-data.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getConnectedUser(req: Request, user: any): Promise<any>;
    addPersonalData(req: Request, personalDataDto: PersonalDataDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/user-personal.entity").UserDataDocument> & import("./entities/user-personal.entity").UserPersonalData & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
