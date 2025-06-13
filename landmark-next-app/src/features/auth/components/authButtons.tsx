'use client'

import { loginWithOidcProvider, logout, signupWithOidcProvider } from "@/features/auth/lib/authActions"
import { Button } from "@/shared/components/buttons/button"

export type AuthButtonsProps = {
  userSessionExists: boolean;
  returnUrl: string;
};

export const AuthButtons = ({
  userSessionExists,
  returnUrl
}: AuthButtonsProps) => {
  return (
    <div className="flex gap-2 justify-center items-center">
      {userSessionExists ? (
        <Button 
          className='bg-black text-white' 
          onClick={() => {logout(returnUrl)}}>
          Logout
        </Button>
      ) : (
        <>
          <Button 
            className='bg-app-secondary hover:bg-app-tertiary text-app-primary-text' 
            onClick={() => {loginWithOidcProvider(returnUrl)}}>
            Login
          </Button>
          <Button 
            className='bg-black text-white hover:text-app-tertiary' 
            onClick={() => {signupWithOidcProvider(returnUrl)}}>
            Sign up
          </Button>
        </>
      )}
    </div>
  )
}
