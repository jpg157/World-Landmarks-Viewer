// Landmark Components Props ===

import { MouseEventHandler } from "react";

export type LandmarkImageProps = {
  imageSrc: string;
  imageAlt: string;
};

export type LandmarkCardProps = {
  landmarkId: string;
  landmarkName: string;
  landmarkDescription: string;
  imageProps: LandmarkImageProps;
};

export type Landmark3DViewButtonProps = {
  landmarkId: string;
}

export type LandmarkViewDescriptionButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

// export type UploadImageWidgetProps = {
//   saveImageFileFn: (imageFile: File) => Promise<void>;
//   savedImgFile: File | null;
// }