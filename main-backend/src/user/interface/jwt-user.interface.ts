import { UserRole } from "src/enum/user-role.enum";

export interface JwtUser {
    id: string;
    username: string;
    email: string;
    role : UserRole
  }
  