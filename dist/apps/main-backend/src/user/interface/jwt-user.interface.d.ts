import { UserRole } from "../../enum/user-role.enum";
export interface JwtUser {
    id: string;
    username: string;
    email: string;
    role: UserRole;
}
