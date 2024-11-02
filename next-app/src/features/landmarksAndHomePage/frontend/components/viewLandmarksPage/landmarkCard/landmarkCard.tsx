import React from 'react'
import LandmarkImage from '../../landmarkImage/landmarkImage';
import Google3DViewButton from './google3DViewButton';
import ViewDescriptionButton from './viewDescriptionButton';

import { LandmarkCardProps } from '../../../types/landmarks';

const LandmarkCard = (landmarkCardData: LandmarkCardProps) => {
  return (
      <>
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
            <Google3DViewButton></Google3DViewButton>
            <ViewDescriptionButton></ViewDescriptionButton>
          </div>
        </div>
      </>
  );
}

export default LandmarkCard