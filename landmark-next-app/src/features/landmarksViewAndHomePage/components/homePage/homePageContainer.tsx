import React from 'react'
import ExploreLandmarksButton from './exploreLandmarksButton'
import Footer from '@/features/footer/components/footer'
import HomeNavigationMenu from '@/features/navigationMenu/components/homeNavigationMenu'
import LandmarkImageCarousel from './landmarkImageCarousel/landmarkImageCarousel'
import { LandmarkImageProps } from '../../types/landmarkComponentPropTypes/landmarkComponentProps'
import { getAllLandmarks } from '../../api/landmarksView/getLandmarks'
import { LandmarksResponse, SavedLandmark } from '../../types/landmarks'

async function HomePageContainer() {

  let landmarksResponse: LandmarksResponse;
  let landmarkImgPropList: LandmarkImageProps[]
  
  try
  {
    landmarksResponse = await getAllLandmarks();

    const landmarksList: SavedLandmark[] = landmarksResponse.data;

    // Landmark Image Carousel Images
    landmarkImgPropList = landmarksList.map((landmark) => {
      return { imageSrcUrl: landmark.imageApiUrl, imageAlt: landmark.name };
    });
  }
  catch (error)
  {
    landmarkImgPropList = [];
  }

  return (
    <>
      {/* Home Navigation menu */}
      <HomeNavigationMenu></HomeNavigationMenu>

      <main>
        
        <LandmarkImageCarousel landmarkImagePropsList={landmarkImgPropList}></LandmarkImageCarousel>

        {/* Explore landmarks button */}
        <div className={`
          flex items-center justify-center 
          my-6
          md:my-8
          `}
        >
          <h1 className={
            `
            inline-block
            text-lg 
            md:text-4xl 
            roboto
            `
            }
          >
            Explore Historical Landmarks around the world
          </h1>
        </div>

        <div className="flex justify-center">
          <ExploreLandmarksButton></ExploreLandmarksButton>
        </div>

      </main>

      {/* Footer (fixed to bottom) */}
      <Footer fixedToBottomPosition={true}></Footer>
    </>
  )
}

export default HomePageContainer
