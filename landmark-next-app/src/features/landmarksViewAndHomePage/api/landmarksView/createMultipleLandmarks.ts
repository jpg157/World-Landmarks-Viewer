'use server'

import { ServerActionResponse } from "@/shared/types";
import { Landmark } from "../../types/landmarks";
import { auth0 } from "@/shared/lib/auth0";

export async function createMultipleLandmarks(data: Landmark[]): Promise<ServerActionResponse<void>> {
  try {
    const { token: accessToken } = await auth0.getAccessToken();

    const response = await fetch(`${process.env.SERVER_API_URL}/api/landmarks-view/landmarks/multiple`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {

      if (response.status === 400) {
        const errorMessage = await response.json();
        throw new Error(errorMessage);
      }

      throw new Error(response.statusText);
    }

    return { ok: true, data: undefined };
  }
  catch (error) {
    console.log((error as Error).message);
    return { ok: false, errorMessage: (error instanceof Error) ? error.message : "An error occured while attempting to create multiple landmarks" };
  }
}
