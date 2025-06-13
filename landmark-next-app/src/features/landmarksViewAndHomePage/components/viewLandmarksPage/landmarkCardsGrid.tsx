import React from 'react'
import { LandmarkCardProps, LandmarkImageProps } from '../../types/landmarkComponentPropTypes/landmarkComponentProps';
import { LandmarksResponse, SavedLandmark } from '../../types/landmarks';
import { getAllLandmarks } from '../../api/landmarksView/getLandmarks';
import LandmarkCard from './landmarkCard/landmarkCard';

export default async function LandmarkCardsGrid() {
  
  // try to fetch landmark data
  const getAllLandmarksRes = await getAllLandmarks();
  
  if (!getAllLandmarksRes.ok) {
    return (
      <div className='flex justify-center items-center'>
        <p>Error loading landmarks. Please try again later.</p>
      </div>
    )
  }

  const landmarksResponse = getAllLandmarksRes.data;

  const landmarksList: SavedLandmark[] = landmarksResponse.data;
  //const paginationMetadata = landmarksResponse.metadata; //TODO - add pagination

  //TODO: query functions for filtering landmarks feature
    //getLandmarksByName
    //getLandmarksByCreationDate
    //getLandmarksByLocation
  
  const gridItems = Object.entries(landmarksList).map(([key, value]) => {

    const landmarkId          = value.id;
    const landmarkName        = value.name;
    const landmarkDescription = value.description; 

    const landmarkImageData: LandmarkImageProps = { 
      imageSrcUrl: value.imageApiUrl,
      imageAlt: landmarkName
    };

    const landmarkCardData: LandmarkCardProps = {
      landmarkId: landmarkId,
      landmarkName: landmarkName,
      landmarkDescription: landmarkDescription,
      imageProps: landmarkImageData
    };
    
    return (
      <LandmarkCard key={key} {...landmarkCardData}></LandmarkCard>
    );
  });

  return (
    <main className='grid grid-cols-2 md:grid-cols-5 gap-5 mx-5'>
      {gridItems}
    </main>
  )
}
