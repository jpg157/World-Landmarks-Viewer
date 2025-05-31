export type LandmarkLocationData = {
  xCoord: number;
  yCoord: number;
}

export type Landmark = {
  id?: number;
  name: string;
  landmarkCreationDate?: string;
  description: string;
  imageApiUrl?: string;
  landmarkLocation?: LandmarkLocationData;//TODO
};

export type SavedLandmark = Required<Landmark>;

export type LandmarksResponse = {
  data: SavedLandmark[]; // should only have the landmarks in the specified pagination range, not all of them
  // Pagination
  metadata: {
    currentPageNum: number;
    totalNumPages: number;
    totalNumItemsPerPage: number;
  }
}
