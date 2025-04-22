import Footer from '@/features/footer/components/footer';
import MainNavigationMenu from '@/features/navigationMenu/components/mainNavigationMenu';
import React from 'react'
import AddNewLandmarkButton from './addNewLandmarkButton';
import LandmarkCardsGrid from './landmarkCardsGrid';

export default function ViewLandmarksPageContainer() {

  return (
    <>
      <MainNavigationMenu/>

      <div className="flex justify-center mb-10">
        <h1 className={`
          inline-block 
          text-lg 
          md:text-3xl 
          roboto
          `}
        >
          Explore Landmarks
        </h1>
      </div>

      <LandmarkCardsGrid/>

      <div className="flex flex-col my-5 gap-3">
        <div className="flex justify-center">
          <h1 className={`
              inline-block 
              text-lg 
              md:text-2xl 
              roboto
              `}
            >
              Want to add a landmark to this collection?
          </h1>
        </div>
        <div className="flex justify-center">
          <AddNewLandmarkButton/>
        </div>
      </div>

      <Footer fixedToBottomPosition={false}></Footer>
    </>
  )
}