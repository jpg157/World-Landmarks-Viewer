'use server'

import { ASPNETCORE_TOKEN_NAME, XSRF_TOKEN_NAME } from "@/shared/constants/antiForgeryToken";
import { auth0 } from "@/shared/lib/auth0";
import { ServerActionResponse } from "@/shared/types";
import { cookieStorage } from "@/shared/utils/cookieStorage";

// Get antiforgery token server action
export async function setAntiforgeryTokenHeaders(): Promise<ServerActionResponse<void>>
{
  try {
    const { token: accessToken } = await auth0.getAccessToken();

    const response = await fetch(
      `${process.env.SERVER_API_URL}/api/antiforgery/token/`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }
    );

    if (!response.ok)
    {
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

    // Have cookies containing antiforgery token values set
    cookieStorage.setHttpOnlyCookie(XSRF_TOKEN_NAME, xsrfToken);
    cookieStorage.setHttpOnlyCookie(ASPNETCORE_TOKEN_NAME, aspNetCoreAntiForgeryToken);

    // return to browser (nextjs implicitly wraps return value in NextResponse)
    return { ok: true, data: undefined };
  }
  catch (error) {
    return {
      ok: false, 
      errorMessage: (error instanceof Error) ? error.message : "An error occured while attempting to set antiforgery token"
    };
  }
}
