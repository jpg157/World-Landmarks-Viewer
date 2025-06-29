'use client'

import React from 'react'
import { CldImage } from 'next-cloudinary'

export type LandmarkImageProps = {
  imageSrcUrl: string;
  imageAlt: string;
};

const LandmarkImage = ({
  imageSrcUrl,
  imageAlt
}: LandmarkImageProps) => {

  return (
    <CldImage
      src={imageSrcUrl || "_"}
      alt={imageAlt}
      width="500"
      height="500"
      className={`object-cover h-[100%] w-[100%] rounded-md`}
    />
  )
}

export default LandmarkImage
