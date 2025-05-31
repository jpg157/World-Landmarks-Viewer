'use server'

import { ASPNETCORE_TOKEN_NAME, XSRF_TOKEN_NAME } from "@/shared/constants/antiForgeryToken";
import { cookies } from "next/headers";

// Get antiforgery token server action
export async function setAntiforgeryTokenHeaders()
{
  const cookieStore = await cookies();

  const response = await fetch(
    `${process.env.SERVER_API_URL}/api/security/antiforgery/token/`,
    { 
      method: "GET",
      credentials: "include"
    }
  );

  if (!response.ok)
  {
    console.log("Failed to set CSRF token");
    throw new Error(response.statusText);
  }

  const setCookies = response.headers.getSetCookie();

  if (!setCookies || setCookies.length <= 0) {
    throw new Error("Error while trying to get antiforgery token");
  }

  const rawXSRFToken = setCookies.find((cookie) => cookie.startsWith(XSRF_TOKEN_NAME));
  const rawAspNetCoreToken = setCookies.find((cookie) => cookie.startsWith(ASPNETCORE_TOKEN_NAME));

  if (!rawXSRFToken || !rawAspNetCoreToken) {
    throw new Error("Error while trying to get antiforgery token");
  }

  const xsrfToken = rawXSRFToken
    .replace(`${XSRF_TOKEN_NAME}=`, '')
    .split(';')[0];

  const aspNetCoreAntiForgeryToken = rawAspNetCoreToken
    .replace(`${ASPNETCORE_TOKEN_NAME}=`, '')
    .split(';')[0];

  // Browser antiforgery cookies from this server action for client to set

  cookieStore.set({
    name: XSRF_TOKEN_NAME,
    value: xsrfToken,
    httpOnly: true,
    path: '/'
  });

  cookieStore.set({
    name: ASPNETCORE_TOKEN_NAME,
    value: aspNetCoreAntiForgeryToken,
    httpOnly: true,
    path: '/'
  });

  console.log("CSRF token successfully set");

  // return to browser (nextjs implicitly wraps void return value in NextResponse)
  return;
}
