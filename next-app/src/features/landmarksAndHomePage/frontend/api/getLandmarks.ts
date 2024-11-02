import { LandmarksResponse } from "../types/landmarks";

export async function getAllLandmarks(): Promise<LandmarksResponse> {

  //TODO: Change once added DB
  const res = await fetch(
    `${process.env.SERVER_API_URL}/api/landmarks`,
    
    //TODO: NEED TO ADD CONFIG TO CACHE HERE
  );
  //TODO: Add network response status checking (if res.ok, else, return failed status num)

  const landmarkData: LandmarksResponse = await res.json(); // Change once added DB

  return landmarkData;
}
