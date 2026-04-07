import type { User } from "./user.interface";

export interface AuthResponse
{
    isAuthenticated: boolean;
    accessToken: string | null;
    user : User | null;
}