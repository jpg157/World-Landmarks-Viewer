import { getLandmarkData } from "../../../backend/global/controllers/landmarks/landmarks-controller";

// "/landmark" Route handlers - entry point to backend api requests

export async function GET() {
  const landmarkData = await getLandmarkData();
  return Response.json( landmarkData );
}
