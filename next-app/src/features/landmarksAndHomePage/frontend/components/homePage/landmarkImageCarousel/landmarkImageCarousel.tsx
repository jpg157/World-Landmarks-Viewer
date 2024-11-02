'use client'

import React from 'react'

import useEmblaCarousel from 'embla-carousel-react'
import Autoscroll from 'embla-carousel-auto-scroll'
import styles from './landmarkImageCarousel.module.css'
import LandmarkImage from '../../landmarkImage/landmarkImage'
import { LandmarkImageProps } from '../../../types/landmarks'

const LandmarkImageCarousel = (imageFileNameList: string[]) => {
  
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoscroll({ startDelay: 0, stopOnInteraction: false })
  ])

  const carouselImageElementList = Object.values(imageFileNameList).map((imageFileName: string, index: number) => {

    const landmarkImageData: LandmarkImageProps = {
      imageSrc: imageFileName
    };

    return (
      <div className={
        `${styles.embla__slide}
          h-[20vh]
          md:h-[35vh]
        `}
        key={index}>

        <LandmarkImage {...landmarkImageData}></LandmarkImage>

      </div>
    );
  });

  return (
    <div className={`${styles.embla} mx-auto max-w-screen-lg`} ref={emblaRef}>
      <div className={styles.embla__container}>
        {carouselImageElementList}
      </div>
    </div>  
  )
}

export default LandmarkImageCarousel
