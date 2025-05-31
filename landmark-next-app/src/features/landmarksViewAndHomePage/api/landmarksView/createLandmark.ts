'use server'

import { Landmark, SavedLandmark } from "../../types/landmarks";

// type with all required fields except imageApiUrl omitted (created in seperate post request)
type LandmarkExcludeImageUrl = Omit<SavedLandmark, "imageApiUrl">

export async function createLandmark(data: Landmark): Promise<LandmarkExcludeImageUrl> {

    // Make post request to server passing Landmark type object into body
    const response: Response = await fetch(
      `${process.env.SERVER_API_URL}/api/landmarks-view/landmarks/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...data, 
          id: null,
          landmarkCreationDate: null,
          imageApiUrl: null,
          landmarkLocation: {xCoord: 0.0, yCoord: 0.0} // TODO
        }), // user does not create landmark id, creation date, and imageApiUrl attributes
      },
    );
    
    // Check response status
    if (!response.ok)
    {
      const errorResponseMessage = await response.json();
      throw new Error(errorResponseMessage);
    }

    // Return new landmark from api response
    const newLandmark: LandmarkExcludeImageUrl = await response.json();
    return newLandmark;
}
