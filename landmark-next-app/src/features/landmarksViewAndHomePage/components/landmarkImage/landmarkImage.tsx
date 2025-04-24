'use client'

import React from 'react'
import Image from 'next/image'
import { LandmarkImageProps } from '../../types/landmarkComponentPropTypes/landmarkComponentProps'
import { CldImage } from 'next-cloudinary'

// import { CldImage } from 'next-cloudinary';

const LandmarkImage = (imageProps: LandmarkImageProps) => {

  return (
    // <Image
    // src={imageProps.imageSrc}
    // alt={imageProps.imageAlt}
    // height={1000}
    // width={1000}
    // className={`object-cover h-[100%] w-[100%] rounded-md`}
    // />

    <CldImage
    src={imageProps.imageSrcUrl} //TODO: get image source from Cloudinary Media Explorer
    alt={imageProps.imageAlt}
    //TODO: add onError event
    width="500"
    height="500"
    className={`object-cover h-[100%] w-[100%] rounded-md`}
    /> 
  )
}

export default LandmarkImage
