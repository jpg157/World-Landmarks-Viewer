import React from 'react'
import ExploreLandmarksButton from './exploreLandmarksButton'
import Footer from '@/features/footer/components/footer'
import LandmarkImageCarousel from './landmarkImageCarousel/landmarkImageCarousel'
import { getAllLandmarks } from '../../api/landmarksView/getLandmarks'
import { LandmarksResponse, SavedLandmark } from '../../types/landmarks'
import NavigationMenu from '@/features/navigationMenu/components/navigationMenu'
import { homePageNavItemProps } from '@/features/navigationMenu/constants/NavMenuLinks'
import { getUser } from '@/features/auth/lib/getUser'
import { AUTH0_RETURN_URLS } from '@/shared/constants/auth0ReturnUrls'
import { LandmarkImageProps } from '../landmarkImage/landmarkImage'

async function HomePageContainer() {

  let landmarkImgPropList: LandmarkImageProps[]
  let userSessionExists = false;
  
  const userResponse = await getUser();
  userSessionExists = userResponse.ok;

  const getAllLandmarksRes = await getAllLandmarks();

  if (!getAllLandmarksRes.ok) {
    landmarkImgPropList = [];
  }
  else {
    const landmarksResponse: LandmarksResponse = getAllLandmarksRes.data;

    const landmarksList: SavedLandmark[] = landmarksResponse.data;
    //const paginationMetadata = landmarksResponse.metadata; //TODO - add pagination

    // Landmark Image Carousel Images
    landmarkImgPropList = landmarksList.map((landmark) => {
      return { imageSrcUrl: landmark.imageApiUrl, imageAlt: landmark.name };
    });
  }

  return (
    <>
      {/* Home navigation menu */}
      <NavigationMenu
        userSessionExists={userSessionExists}
        returnUrl={AUTH0_RETURN_URLS.ROOT}
        navItems={homePageNavItemProps}
      />

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
