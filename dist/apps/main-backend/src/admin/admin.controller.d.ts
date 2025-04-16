import { AdminService } from './admin.service';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
export declare class AdminController {
    private readonly adminService;
    private readonly authService;
    private readonly userService;
    constructor(adminService: AdminService, authService: AuthService, userService: UserService);
}
