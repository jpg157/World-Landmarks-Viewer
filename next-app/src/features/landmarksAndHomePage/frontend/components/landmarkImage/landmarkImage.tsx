import React from 'react'
import Image from 'next/image'
import { LandmarkImageProps } from '../../types/landmarks'

const LandmarkImage = (imageProps: LandmarkImageProps) => {
  
  return (
    <Image
    src={'/landmarkData/images/' + imageProps.imageSrc}
    alt={imageProps.imageSrc}
    height={1000}
    width={1000}
    className={`object-cover h-[100%] w-[100%] rounded-md`}
    />
  )
}

export default LandmarkImage