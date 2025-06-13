'use server'

import { User } from "@auth0/nextjs-auth0/types";
import { AuthUser } from "../types";
import { USER_ROLES_NAMESPACE, UserRolesEnum } from "../constants/userRoles";
import { userRoleStringToEnum } from "../lib/userRoles";
import { auth0 } from "@/shared/lib/auth0";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ServerActionResponse } from "@/shared/types";

export type Auth0UserRole = {
  id: string;
  name: string;
  description: string;
};

// Returns information of the currently logged in user from the existing session
// If a session does not exist, returns null
export async function getUser(): Promise<ServerActionResponse<AuthUser>> {

  try {
    const session = await auth0.getSession();

    if (!session) {
      throw new Error("No session exists");
    }

    const idToken = session.tokenSet.idToken;
    const auth0User: User = session.user;
    const userId: string = auth0User.sub.split('|')[1];

    if (!idToken) {
      throw new Error ("No id token for the current user exists");
    }

    // decode the id token containing and extract custom role claim

    const decodedToken = jwt.decode(idToken) as JwtPayload;

    const auth0UserRoles: Auth0UserRole[] | undefined = decodedToken?.[USER_ROLES_NAMESPACE];

    // Should never get here if post login script is working properly
    if (!auth0UserRoles) {
      throw new Error("Invalid user. User does not have roles assigned");
    }

    let userRoles: UserRolesEnum[];

    userRoles = auth0UserRoles.map((auth0UserRole: Auth0UserRole) => {
      return userRoleStringToEnum(auth0UserRole.name);
    });

    const currentUser: AuthUser =  {
      userId: userId,
      roles: userRoles,
      email: auth0User.email
    };

    return { ok: true, data: currentUser };
  }
  catch (error) {
    return {
      ok: false, 
      errorMessage: (error instanceof Error) ? error.message : "There was a problem while fetching the current user"
    };
  }
}
