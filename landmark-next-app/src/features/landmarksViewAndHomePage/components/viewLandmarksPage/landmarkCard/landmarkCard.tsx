'use client'

import React from 'react'
import LandmarkImage from '../../landmarkImage/landmarkImage';
import Google3DViewButton from './google3DViewButton';
import ViewDescriptionButton from './viewLandmarkDescriptionButton';
import { LandmarkCardProps } from '@/features/landmarksViewAndHomePage/types/landmarkComponentPropTypes/landmarkComponentProps';

const LandmarkCard = (landmarkCardData: LandmarkCardProps) => {

  function flipCardToShowDescription() {
    alert(landmarkCardData.landmarkDescription); //TODO: implement card flip animation, also display landmarkDescription on opposite side of card
  }

  return (
    // TODO: make the card expand EQUALLY in all directions when hovered
    <div className='transition hover:scale-105'>
      <div className='h-[30vh]'>
        <LandmarkImage {...(landmarkCardData.imageProps)}></LandmarkImage>
      </div>

      <div className='flex flex-col gap-1 items-center justify-center mt-2'>
        <h1 className={`
            inline-block
            text-sm
            md:text-lg
            roboto
          `}
        >
          {landmarkCardData.landmarkName}
        </h1>
        
        <div className='flex gap-1 items-center justify-center'>
          <Google3DViewButton landmarkId={landmarkCardData.landmarkId} />
          <ViewDescriptionButton onClick={flipCardToShowDescription} />
        </div>
      </div>
    </div>
  );
}

export default LandmarkCard
