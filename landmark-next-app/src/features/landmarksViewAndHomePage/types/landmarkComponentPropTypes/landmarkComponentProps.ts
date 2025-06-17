// Landmark Components Props ===

import { AuthUser } from "@/features/auth/types";

export type LandmarkImageProps = {
  imageSrcUrl: string;
  imageAlt: string;
};

export type LandmarkCardProps = {
  landmarkId: number;
  landmarkName: string;
  landmarkDescription: string;
  imageProps: LandmarkImageProps;
  currentUser: AuthUser | undefined | null;
};

// export type UploadImageWidgetProps = {
//   saveImageFileFn: (imageFile: File) => Promise<void>;
//   savedImgFile: File | null;
// }
