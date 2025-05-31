'use client'

import React from 'react'

import useEmblaCarousel from 'embla-carousel-react'
import Autoscroll from 'embla-carousel-auto-scroll'
import styles from './landmarkImageCarousel.module.css';
import LandmarkImage from '../../landmarkImage/landmarkImage'
import { LandmarkImageProps } from '@/features/landmarksViewAndHomePage/types/landmarkComponentPropTypes/landmarkComponentProps'

export type LandmarkImageCarouselProps = {
  landmarkImagePropsList: LandmarkImageProps[]
};

const LandmarkImageCarousel = ({
  landmarkImagePropsList
}: LandmarkImageCarouselProps) => {
  
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoscroll({ startDelay: 0, stopOnInteraction: false })
  ])

  if (landmarkImagePropsList.length === 0) {
    alert("There was an error loading landmark slideshow. Please try again later");
    return;
  }

  const carouselImageElementList = Object.values(landmarkImagePropsList).map((landmarkImageProps: LandmarkImageProps, index: number) => {

    return (
      <div 
        className={`
          ${styles.embla__slide}
          h-[20vh]
          md:h-[35vh]
        `}
        key={index}
      >

        <LandmarkImage {...landmarkImageProps}></LandmarkImage>

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
