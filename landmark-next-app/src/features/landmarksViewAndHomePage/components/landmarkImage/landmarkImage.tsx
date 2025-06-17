'use client'

import React from 'react'
import { LandmarkImageProps } from '../../types/landmarkComponentPropTypes/landmarkComponentProps'
import { CldImage } from 'next-cloudinary'

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
