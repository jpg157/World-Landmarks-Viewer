'use client'

import Link from 'next/link';
import Image from 'next/image'
import React from 'react'
import downArrow from '@/images/downArrow.svg';
import landmarkAppLogo from '@/images/landmarkAppLogo.svg'
import { NavigationMenuItem } from '../types/navigationMenuItem';
import { NavLink } from '@/shared/components/buttons/navLink';
import { AuthButtons } from '@/features/auth/components/authButtons';

export type NavigationMenuProps = {
  userSessionExists: boolean;
  returnUrl: string;
  navItems: NavigationMenuItem[]
};

const NavigationMenu = ({
  userSessionExists,
  returnUrl,
  navItems
}: NavigationMenuProps) => {

  // create list of html elements from nav menu
  const NavButtonList = Object.values(navItems).map((navItem: NavigationMenuItem, index: number) => (

    <NavLink 
      key={index} 
      href={navItem.navLinkHref} 
      className='text-lg hover:text-fuchsia-600 hover:bg-gray-50'
    >
      
      {navItem.navItemLabel}

      {navItem.isDropdown && (
        <Image
          src={downArrow}
          alt='downArrow'
          height={13}
          width={13}
          className={
            "ml-2 inline"
          }
        />
      )}
    </NavLink>
  ));

  return (
    <div className='flex w-full my-5 justify-center items-center'>
      <div className='w-1/3'/>
      <div className='w-1/3 flex justify-center items-center'>
        <nav className="inline-flex items-center justify-center rounded-full">
          <Link 
            href="/"
            className={"rounded-full px-6 text-xl roboto"}
          >
            <Image
              src={landmarkAppLogo}
              alt='landmarkAppLogo'
              height={50}
              width={50}
              className={"py-0 px-0"}
            />
          </Link>

          {NavButtonList}
          
        </nav>
      </div>
      <div className='w-1/3'>
        <AuthButtons 
          userSessionExists={userSessionExists} 
          returnUrl={returnUrl}
        />
      </div>
    </div>
  )
}

export default NavigationMenu;
