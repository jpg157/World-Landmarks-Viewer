'use server'

import { cookies } from "next/headers";
import { ASPNETCORE_TOKEN_NAME, XSRF_TOKEN_NAME } from "@/shared/constants/antiForgeryToken";

type UploadLandmarkAssetDTO = {
  landmarkId: number;
  formData: FormData;
};

export async function uploadLandmarkImageFile({
  landmarkId,
  formData,
}: UploadLandmarkAssetDTO): Promise<void>
{
  const cookieStore = await cookies();

  const xsrfToken = cookieStore.get(XSRF_TOKEN_NAME)?.value;
  const aspNetCoreAntiForgeryToken = cookieStore.get(ASPNETCORE_TOKEN_NAME)?.value;

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
}
