import React from 'react'
import NavigationMenu from "./navigationMenuGeneral/navigationMenu"
import { mainPageNavItemProps } from '../../../../frontend/global/constants/NavMenuLinks';

const MainNavigationMenu = () => {
  return (
    <div className="flex justify-center my-5">
      <NavigationMenu {...mainPageNavItemProps}></NavigationMenu>
    </div>
  )
}

export default MainNavigationMenu