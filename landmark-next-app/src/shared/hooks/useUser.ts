'use client'

import { getUser } from "@/features/auth/lib/getUser";
import { AuthUser } from "@/features/auth/types"
import { useEffect, useState } from "react";

export const useUser = () => {

  const [currentUser, setCurrentUser] = useState<AuthUser | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tryToGetUser = async () => {
      try {
        const response = await getUser();
        if (!response.ok) {
          throw new Error(response.errorMessage);
        }
        const authUser = response.data;
        setCurrentUser(authUser);
      }
      catch (error) {
        // no session or error occured
        setCurrentUser(null);
      }
      finally {
        setLoading(false);
      }
    }
    tryToGetUser();
  }, []); // only run on initial mount

  return { user: currentUser, isLoading: loading };
}
