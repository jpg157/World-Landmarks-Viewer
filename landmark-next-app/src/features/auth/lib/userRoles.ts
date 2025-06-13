import { UserRolesEnum } from "../constants/userRoles";

// Get all allowed roles
export const isAuthorizedUser = (userRoles: UserRolesEnum[], requiredUserRole: UserRolesEnum) => {

  let allowedRolesSet: Set<UserRolesEnum> = new Set();

  // Get user's higheset role access level, and all role access levels below it
  userRoles.forEach((userRole: UserRolesEnum) => {

    switch (userRole) {
    // case (UserRolesEnum.SUPER_ADMIN):
    //   allowedRolesSet.add(UserRolesEnum.SUPER_ADMIN);
    //   allowedRolesSet.add(UserRolesEnum.ADMIN);
    //   allowedRolesSet.add(UserRolesEnum.REGULAR_USER);
    case (UserRolesEnum.ADMIN):
      allowedRolesSet.add(UserRolesEnum.ADMIN);
      allowedRolesSet.add(UserRolesEnum.REGULAR_USER);
      break;

    case (UserRolesEnum.REGULAR_USER):
      allowedRolesSet.add(UserRolesEnum.REGULAR_USER);
      break;

    default:
      throw new Error("UserRolesEnum element does not match any of the UserRolesEnum member values");
    }
  });

  return allowedRolesSet.has(requiredUserRole);
}

export function userRoleStringToEnum(userRoleString: string): UserRolesEnum {
  switch (userRoleString) {
    // case (UserRolesEnum.SUPER_ADMIN):
    //   return UserRolesEnum.SUPER_ADMIN;
    case (UserRolesEnum.ADMIN):
      return UserRolesEnum.ADMIN;
    case (UserRolesEnum.REGULAR_USER):
      return UserRolesEnum.REGULAR_USER;
    default:
      throw new Error("No string user roles match any of the UserRolesEnum member values");
  }
}
