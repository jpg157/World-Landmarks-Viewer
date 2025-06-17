'use server'

import { SavedLandmark } from "@/features/landmarksViewAndHomePage/types/landmarks";
import { ASPNETCORE_TOKEN_NAME, XSRF_TOKEN_NAME } from "@/shared/constants/antiForgeryToken";
import { auth0 } from "@/shared/lib/auth0";
import { ServerActionResponse } from "@/shared/types";
import { cookieStorage } from "@/shared/utils/cookieStorage";

export type DeleteLandmarkDTO = Pick<SavedLandmark, "id">;

export async function deleteLandmark({
  id
}: DeleteLandmarkDTO): Promise<ServerActionResponse<void>> {
  try {
    const { token: accessToken } = await auth0.getAccessToken();
    const xsrfToken                   = await cookieStorage.getValue(XSRF_TOKEN_NAME);
    const aspNetCoreAntiForgeryToken  = await cookieStorage.getValue(ASPNETCORE_TOKEN_NAME);

    if (!xsrfToken || !aspNetCoreAntiForgeryToken) {
      throw new Error("Antiforgery tokens not set in header");
    }

    const response = await fetch(
      `${process.env.SERVER_API_URL}/api/landmarks-view/landmarks/${id}`, {
      method: 'DELETE',
      headers: {
          "X-XSRF-TOKEN": xsrfToken, // send token in header
          "Cookie": `${ASPNETCORE_TOKEN_NAME}=${aspNetCoreAntiForgeryToken};`,
          Authorization: `Bearer ${accessToken}`,
          // "Content-type": "multipart/form-data",
      },
    });
    
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return { ok: true, data: undefined }
  }
  catch (error) {
    return { 
      ok: false, 
      errorMessage: (error instanceof Error) ? error.message : "There was a problem while trying to delete landmark" 
    };
  }  
}