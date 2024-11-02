// 'use client'

import React from 'react'
import Link from 'next/link';
import { LandmarkCardProps, LandmarkImageProps } from '../../types/landmarks';
import LandmarkImage from '../landmarkImage/landmarkImage';
import { getAllLandmarks } from '../../api/getLandmarks';
import ReadMoreButton from './landmarkCard/viewDescriptionButton';
import GoogleViewButton from './landmarkCard/google3DViewButton';
import LandmarkCard from './landmarkCard/landmarkCard';

export default async function LandmarkImageGrid() {

  const landmarks = await getAllLandmarks();
  //TODO: query functions for filtering landmarks feature
    //getLandmarksByName
    //getLandmarksByDate
    //getLandmarksByLocation

  //TODO: combine Landmark images with Landmark data
  
  const gridItems = Object.entries(landmarks).map(([key, value], index: number) => {

    const landmarkName = value.name;
    const landmarkDescription = value.description; //TODO: add description page to display
    const landmarkImageURL = value.imageURL;

    const imageData: LandmarkImageProps = { imageSrc: landmarkImageURL };
    
    const landmarkCardData: LandmarkCardProps = {
      landmarkName: landmarkName,
      imageProps: imageData
    };
    
    return (
        <div key={index} className='transition hover:scale-105'>
          <LandmarkCard {...landmarkCardData}></LandmarkCard>
        </div>
    );
  });

  return (
    <main className='grid grid-cols-2 md:grid-cols-5 gap-5 mx-5'>
      {gridItems}
    </main>
  )
}
