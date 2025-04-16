import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserLoginDto } from '../user/dto/user-login.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<Partial<User>>;
    login(userLoginDto: UserLoginDto): Promise<{
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
    googleAuth(): Promise<void>;
    googleRedirect(req: any): Promise<{
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
}
