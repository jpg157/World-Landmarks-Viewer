import React from 'react'
import NavigationMenu from "./navigationMenuGeneral/navigationMenu"
import { homePageNavItemProps } from '../../../../frontend/global/constants/NavMenuLinks';

const HomeNavigationMenu = () => {
  return (
    <div className="flex justify-center my-5">
      <NavigationMenu {...homePageNavItemProps}></NavigationMenu>
  </div>
  )
}

export default HomeNavigationMenu