import { ApiErrorReponse } from "@/shared/types/errors";
import { LandmarksResponse } from "../../types/landmarks";

export async function getAllLandmarks(): Promise<LandmarksResponse> {

  const response: Response = await fetch(
    `${process.env.SERVER_API_URL}/api/landmarks-view/landmarks`, {method: "GET",}
    //TODO: 
    // - ADD CONFIG TO FORCE-CACHE HERE
    // - Ensure that the cache / page gets revalidated when a landmark is added
  );
  
  if (!response.ok) {
    console.log("in response not ok")
    const errorMessage: ApiErrorReponse = await response.json();
    throw new Error(errorMessage.message || "Error: Failed to fetch landmark data");
    // !!! consider using nextjs api error instead !!!
  }

  const landmarkData: LandmarksResponse = await response.json();

  return landmarkData;
}
