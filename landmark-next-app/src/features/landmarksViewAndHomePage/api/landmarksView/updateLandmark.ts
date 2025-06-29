'use server'

import { auth0 } from "@/shared/lib/auth0";
import { Landmark, SavedLandmark } from "../../types/landmarks";
import { ServerActionResponse, ValidationErrors } from "@/shared/types";

export async function updateLandmark(data: Landmark): Promise<ServerActionResponse<SavedLandmark>> {

  try {
    const { token: accessToken } = await auth0.getAccessToken();

    // Make post request to server passing Landmark type object into body
    const response: Response = await fetch(
      `${process.env.SERVER_API_URL}/api/landmarks-view/landmarks/`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          // landmarkLocation: {xCoord: 0.0, yCoord: 0.0} // TODO
        }), // user does not update landmark id, creation date attributes,
            // or manually update imageApiUrl
      },
    );
    
    // Check response status
    if (!response.ok)
    {
      // If bad request status code (custom error response)
      if (response.status === 400) {
        const errorData = await response.json();
        // const validationResponse: ValidationErrors = errorData. 
        throw new Error("Bad request");//errorResponseMessage);
      }
      else {
        throw new Error (response.statusText);
      }
    }

    // Return new landmark from api response
    const updatedLandmark: SavedLandmark = await response.json();
    return { ok: true, data: updatedLandmark };
  }
  catch (error) {
    return {
      ok: false, 
      errorMessage: (error instanceof Error) ? error.message : "An error occured while attempting to update landmark"
    };
  }
}
