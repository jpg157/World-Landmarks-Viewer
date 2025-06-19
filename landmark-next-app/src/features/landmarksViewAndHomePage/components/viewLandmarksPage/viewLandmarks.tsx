import Footer from '@/features/footer/components/footer';
import React from 'react'
import LandmarkCardsGrid from './landmarkCardsGrid';
import { getUser } from '@/features/auth/lib/getUser';
import { AUTH0_RETURN_URLS } from "@/shared/constants/auth0ReturnUrls"
import NavigationMenu from '@/features/navigationMenu/components/navigationMenu';
import { mainPageNavItemProps } from '@/features/navigationMenu/constants/NavMenuLinks';
import CreateLandmarkComponentGroup from './createLandmark/createLandmarkComponentGroup';

export default async function ViewLandmarksPageContainer() {

  // check if user session exists
  const getUserRes        = await getUser();
  const userSessionExists = getUserRes.ok;
  const currentUser       = getUserRes.ok ? getUserRes.data : null;

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

      <LandmarkCardsGrid currentUser={currentUser}/>

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
        <CreateLandmarkComponentGroup currentUser={currentUser}/>
      </div>

      <Footer fixedToBottomPosition={false}></Footer>
    </>
  )
}
