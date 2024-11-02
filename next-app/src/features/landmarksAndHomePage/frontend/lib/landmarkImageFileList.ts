import { landmarkAssetsPath } from "../../../../frontend/global/constants/PublicFilePaths";
import { getFileList } from "../../../../frontend/global/utils/fileFunctions";

export const landmarkImageFileList = await getFileList(landmarkAssetsPath + "/images/");