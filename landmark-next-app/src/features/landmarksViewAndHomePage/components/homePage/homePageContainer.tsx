import React from 'react'
import ExploreLandmarksButton from './exploreLandmarksButton'
import Footer from '@/features/footer/components/footer'
import HomeNavigationMenu from '@/features/navigationMenu/components/homeNavigationMenu'
import LandmarkImageCarousel from './landmarkImageCarousel/landmarkImageCarousel'
import { LandmarkImageProps } from '../../types/landmarkComponentPropTypes/landmarkComponentProps'

function HomePageContainer() {

  // TODO: get the list of image files from the server using FETCH
  const landmarkImgPropList: LandmarkImageProps[] = []

  return (
    <>
      {/* Home Navigation menu */}
      <HomeNavigationMenu></HomeNavigationMenu>

      <main>
        {/* Landmark Image Carousel */}
        {/* TODO <LandmarkImageCarousel {...landmarkImgPropList}></LandmarkImageCarousel> */}

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