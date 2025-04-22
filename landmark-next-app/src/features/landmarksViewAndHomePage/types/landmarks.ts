export type LandmarkLocationData = {
  xCoord: number;
  yCoord: number;
}

export type Landmark = {
  _id: string;
  name: string;
  landmarkCreationDate?: string;
  description: string;
  imageAPIUrl: string;
  landmarkLocation: LandmarkLocationData;
};

export type SavedLandmark = Required<Landmark>;

export type LandmarksResponse = {
  data: SavedLandmark[];
  // Pagination
  metadata: {
    currentPageNum: number;
    totalNumPages: number;
    totalNumItemsPerPage: number;
  }
}
