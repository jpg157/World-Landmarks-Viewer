import { cookies } from "next/headers";

export const cookieStorage = {

  getValue: async (key: string): Promise<string | undefined> => {
    const cookieStore = await cookies();
    return cookieStore.get(key)?.value;
  },

  setHttpOnlyCookie: async (
    key: string, 
    value: string
  ): Promise<void> => {
    const cookieStore = await cookies();
    cookieStore.set({
      name: key,
      value: value,
      httpOnly: true
    });
  }
}
