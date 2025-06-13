'use server'

import { ASPNETCORE_TOKEN_NAME, XSRF_TOKEN_NAME } from "@/shared/constants/antiForgeryToken";
import { auth0 } from "@/shared/lib/auth0";
import { ServerActionResponse } from "@/shared/types";
import { cookieStorage } from "@/shared/utils/cookieStorage";

type UploadLandmarkAssetDTO = {
  landmarkId: number;
  formData: FormData;
};

export async function uploadLandmarkImageFile({
  landmarkId,
  formData,
}: UploadLandmarkAssetDTO): Promise<ServerActionResponse<void>>
{
  try {
    const { token: accessToken } = await auth0.getAccessToken();

    const xsrfToken                   = await cookieStorage.getValue(XSRF_TOKEN_NAME);
    const aspNetCoreAntiForgeryToken  = await cookieStorage.getValue(ASPNETCORE_TOKEN_NAME);

    if (!xsrfToken || !aspNetCoreAntiForgeryToken) {
      throw new Error("Antiforgery tokens not set in header");
    }

    const response: Response = await fetch(
      `${process.env.SERVER_API_URL}/api/landmarks-view/landmarks/${landmarkId}/image`,
      {
        method: "POST",
        body: formData,
        headers: {
          "X-XSRF-TOKEN": xsrfToken, // send token in header
          "Cookie": `${ASPNETCORE_TOKEN_NAME}=${aspNetCoreAntiForgeryToken};`,
          Authorization: `Bearer ${accessToken}`,
          // "Content-type": "multipart/form-data",
        },
        credentials: "include"
      }
    );

    if (!response.ok)
    {
      const errorResponseMessage = await response.json();
      throw new Error(errorResponseMessage);
    }

    return { ok: true, data: undefined };
  }
  catch (error) {
    return {
      ok: false, 
      errorMessage: (error instanceof Error) ? error.message : "An error occured while attempting to upload image"
    };
  }
}
