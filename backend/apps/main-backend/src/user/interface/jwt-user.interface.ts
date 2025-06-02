import { UserRole } from "@portfolio-builder/shared";

export interface JwtUser {
    id: string;
    username: string;
    email: string;
    role : UserRole
  }
  