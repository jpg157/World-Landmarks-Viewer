//TODO: 
//- MOVE LANDMARK JSON DATA, IMAGE FILES, AND FILELIST TO DB
//- Add params to be able to filter landmarks by specified values

import { promises as fs } from 'fs' // to remove later
import { landmarkAssetsPath } from '../../../../frontend/global/constants/PublicFilePaths'; // to remove later

export async function getLandmarkData() {

  const file = await fs.readFile(process.cwd() + (landmarkAssetsPath + "/json/landmarkNames.json"), 'utf8'); // replace with data requested from landmarks.service.ts
  const data = JSON.parse(file);

  return data;
}