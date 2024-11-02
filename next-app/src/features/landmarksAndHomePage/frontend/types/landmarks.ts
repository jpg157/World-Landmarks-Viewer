export type Landmark = {
  _id: string,
  name: string,
  dateCreated: string,
  description: string,
  imageURL: string // link to storage in cloudinary
};

//TODO: remove and use above type once using db
export type LandmarkTemporary = {
  name: string;
  description: string;
  imageURL: string;
};

// Mapped type for index-able response
export type LandmarksResponse = {
  [key: string]: LandmarkTemporary;
};

// Props ===

export type LandmarkImageProps = {
  imageSrc: string;
};

export type LandmarkCardProps = {
  landmarkName: string;
  imageProps: LandmarkImageProps;
};