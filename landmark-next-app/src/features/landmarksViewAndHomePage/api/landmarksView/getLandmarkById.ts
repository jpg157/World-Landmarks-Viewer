'use server'

import { ServerActionResponse } from "@/shared/types";
import { Landmark } from "../../types/landmarks";

export async function getLandmarkById(id: number): Promise<ServerActionResponse<Landmark>> {
  try {
    const response: Response = await fetch(
      `${process.env.SERVER_API_URL}/api/landmarks-view/landmarks/${id}`, 
      {method: "GET",}
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const landmark: Landmark = await response.json();

    return { ok: true, data: landmark };

  } catch (error) {
    return {
      ok: false, 
      errorMessage: (error instanceof Error) ? error.message : "Failed to fetch landmark data"
    };
  }
}