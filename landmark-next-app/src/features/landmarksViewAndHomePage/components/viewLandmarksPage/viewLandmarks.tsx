import Footer from '@/features/footer/components/footer';
import React from 'react'
import LandmarkCardsGrid from './landmarkCardsGrid';
import CreateLandmarkComponentGroup from './createLandmarkComponents/createLandmarkComponentGroup';
import { getUser } from '@/features/auth/lib/getUser';
import { AUTH0_RETURN_URLS } from "@/shared/constants/auth0ReturnUrls"
import NavigationMenu from '@/features/navigationMenu/components/navigationMenu';
import { mainPageNavItemProps } from '@/features/navigationMenu/constants/NavMenuLinks';

export default async function ViewLandmarksPageContainer() {

  const userResponse = await getUser();
  const userSessionExists = userResponse.ok;

  return (
    <>
      {/* View Landmarks main navigation menu */}
      <NavigationMenu
        userSessionExists={userSessionExists} 
        returnUrl={AUTH0_RETURN_URLS.VIEW_LANDMARKS} 
        navItems={mainPageNavItemProps}
      />

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
        <CreateLandmarkComponentGroup/>
      </div>

      <Footer fixedToBottomPosition={false}></Footer>
    </>
  )
}