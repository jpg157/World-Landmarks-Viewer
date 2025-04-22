import React from 'react'
import { LandmarkCardProps, LandmarkImageProps } from '../../types/landmarkComponentPropTypes/landmarkComponentProps';
import { LandmarksResponse, SavedLandmark } from '../../types/landmarks';
import { getAllLandmarks } from '../../api/landmarksView/getLandmarks';
import LandmarkCard from './landmarkCard/landmarkCard';

export default async function LandmarkCardsGrid() {

  let landmarksResponse: LandmarksResponse;
  
  // try to fetch landmark data
  try
  {
    landmarksResponse = await getAllLandmarks();
  }
  catch (error)
  {
    return (
      <div>
        Error loading landmarks. Please try again later.
      </div>
    )
  }

  const landmarksList: SavedLandmark[] = landmarksResponse.data;

  //TODO: query functions for filtering landmarks feature
    //getLandmarksByName
    //getLandmarksByDate
    //getLandmarksByLocation

  //TODO: combine Landmark images with Landmark data (using cloudinary)
  
  const gridItems = Object.entries(landmarksList).map(([key, value]) => {

    const landmarkId          = value._id;
    const landmarkName        = value.name;
    const landmarkDescription = value.description; 
    const landmarkImageData: LandmarkImageProps = { imageSrc: value.imageAPIUrl };

    const landmarkCardData: LandmarkCardProps = {
      landmarkId: landmarkId,
      landmarkName: landmarkName,
      landmarkDescription: landmarkDescription,
      imageProps: landmarkImageData
    };
    
    return (
      <LandmarkCard key={landmarkId} {...landmarkCardData}></LandmarkCard>
    );
  });

  return (
    <main className='grid grid-cols-2 md:grid-cols-5 gap-5 mx-5'>
      {gridItems}
    </main>
  )
}
