'use client'

import { ReactNode, useEffect } from 'react'
import { UserRolesEnum } from '@/features/auth/constants/userRoles';
import { loginWithOidcProvider } from '../lib/authActions';
import { useUser } from '@/shared/hooks/useUser';
import { isAuthorizedUser } from '../lib/userRoles';

export type AuthGuardProps = {
  children: ReactNode;
  loginReturnUrl: string;
  requiredUserRole: UserRolesEnum
}

const AuthGuard = ({
  children,
  loginReturnUrl,
  requiredUserRole
}: AuthGuardProps) => {

  const { user, isLoading } = useUser();

  useEffect(() => {

    if (isLoading || user === undefined) return;

    if (user === null)
    {
      loginWithOidcProvider(loginReturnUrl);
      return;
    }

    if (!isAuthorizedUser(user.roles, requiredUserRole))
    {
      alert('user is not authorized');
      loginWithOidcProvider(loginReturnUrl);
      return;
    }
    
  }, [user, isLoading, loginReturnUrl, requiredUserRole]);

  // If data fetch not loading and current user is authorized
  return (
    <>
      {(
        !isLoading && 
        user && 
        isAuthorizedUser(user.roles, requiredUserRole)
      ) && (
        children
      )}
    </>
  );
}

export default AuthGuard;
