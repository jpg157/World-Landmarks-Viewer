export type CreateLandmarkFormData = {
  landmarkName: string,
  landmarkDescription: string,
  landmarkImgFile: File | null,
  landmarkImgUrl: string | undefined
}

export type CreateLandmarkFormErrors = {
  landmarkNameErrors?: string[],
  landmarkDescriptionErrors?: string[],
  landmarkImgFileErrors?: string[]
}
