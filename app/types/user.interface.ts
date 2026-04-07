
import type { UserApplication } from "./userApplication.interface";
import type { UserRoles } from "./userRoles.interface";

export interface User {
    title:        string;
    userName:     string;
    displayName:  string;
    email:        string;
    departmentId: number;
    externo:      boolean;
    userHash:     string;
    isActive:     boolean;
    departmentDesc: string;
    roles? : UserRoles[];
    idPersona: number;
    idUser: number;
    userApplication?: UserApplication;
}
