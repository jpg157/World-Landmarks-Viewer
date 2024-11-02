'use client'

import Link from 'next/link';
import Image from 'next/image'
import React from 'react'
import { NavigationMenuProps } from '../../../types/navigationMenuProps';

// import landmapAppLogo from '../../../public/landmarkAppLogo.svg'

const NavigationMenu = (navItems: NavigationMenuProps[]) => {

  // create list of html elements from nav menu
  const NavButtonList = Object.values(navItems).map((navItem: NavigationMenuProps, index: number) => (

    <Link key={index} href={navItem.navLinkHref} 
      className={
        "rounded-full px-6 py-1 text-xl roboto hover:text-fuchsia-600 hover:bg-gray-50"
      }
    >
      {navItem.navItemLabel}

      {navItem.isDropdown && (
        <Image
          src="/downArrow.svg"
          alt='downArrow'
          height={13}
          width={13}
          className={
            "ml-2 inline"
          }
        />
      )}
      
    </Link>
  ));

  return (
    <nav className=
    "inline-flex items-center justify-center rounded-full"
    >
      <Link href="/"
        className={
          "rounded-full px-6 text-xl roboto"
        }
      >
      <Image
        src="/landmarkAppLogo.svg"
        alt='landmarkAppLogo'
        height={50}
        width={50}
        className={
          "py-0 px-0"
        }
        />
      </Link>

      {NavButtonList}
    </nav>
  )
}

export default NavigationMenu;
