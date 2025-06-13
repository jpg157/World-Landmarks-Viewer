import { baseUrl, viewLandmarksPageRoute } from "./pageRoutes";

export const AUTH0_RETURN_URLS = {
  ROOT: baseUrl,
  VIEW_LANDMARKS: `${baseUrl}${viewLandmarksPageRoute}`
}
