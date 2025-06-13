'use server'

import { ServerActionResponse } from "@/shared/types";
import { LandmarksResponse } from "../../types/landmarks";

export async function getAllLandmarks(): Promise<ServerActionResponse<LandmarksResponse>> 
{
  try {
    const response: Response = await fetch(
      `${process.env.SERVER_API_URL}/api/landmarks-view/landmarks`, 
      {method: "GET",}
    );
    
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const landmarkData: LandmarksResponse = await response.json();

    return { ok: true, data: landmarkData };
  }
  catch (error) {
    return {
      ok: false, 
      errorMessage: (error instanceof Error) ? error.message : "Failed to fetch landmark data"
    };
  }
}
