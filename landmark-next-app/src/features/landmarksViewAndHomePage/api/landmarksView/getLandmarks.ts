'use server'

import { LandmarksResponse } from "../../types/landmarks";

export async function getAllLandmarks(): Promise<LandmarksResponse> 
{
  const response: Response = await fetch(
    `${process.env.SERVER_API_URL}/api/landmarks-view/landmarks`, 
    {method: "GET",}
  );
  
  if (!response.ok) {
    const errorMessage: string = response.statusText;
    throw new Error(errorMessage || "Error: Failed to fetch landmark data");
  }

  const landmarkData: LandmarksResponse = await response.json();

  return landmarkData;
}
