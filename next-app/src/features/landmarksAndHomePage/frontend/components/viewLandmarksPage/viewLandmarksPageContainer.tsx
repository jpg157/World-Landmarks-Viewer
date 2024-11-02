import React from 'react'
import { landmarkImageFileList } from '../../lib/landmarkImageFileList'
import LandmarkImageGrid from './landmarkCardsGrid'
import Footer from "../../../../../frontend/global/components/footer";
import MainNavigationMenu from '../../../../../frontend/global/components/navigationMenu/mainNavigationMenu';

export const dynamic = 'force-static';

export default function DiscoverLandmarksPageContainer() {

  return (
    <>
      <MainNavigationMenu></MainNavigationMenu>

      <div className="flex justify-center mb-10">
        <h1 className={`
            inline-block 
            text-lg 
            md:text-3xl 
            roboto
            `}>Discover Landmarks
        </h1>
      </div>

      <LandmarkImageGrid></LandmarkImageGrid>

      <Footer fixedToBottomPosition={false}></Footer>
    </>
  )
}