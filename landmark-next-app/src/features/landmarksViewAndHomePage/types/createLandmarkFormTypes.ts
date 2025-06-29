// export type LandmarkData = {
//   name: string,
//   description: string,
//   imgFile: File | null,
//   imgUrl: string | undefined
// };

export type CreateLandmarkFormErrors = {
  name?: string[] | undefined;
  description?: string[] | undefined;
  imgFile?: string[] | undefined;
};
