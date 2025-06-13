import { UserRolesEnum } from "../constants/userRoles";

export type AuthUser = {
  userId: string;
  roles: UserRolesEnum[];
  email?: string;
};
