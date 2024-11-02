
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { mainPageLink } from '../../../../../frontend/global/constants/PageRoutes'

const ExploreLandmarksButton = () => {
  return (
    <Link href={mainPageLink}
      className={
        `rounded-full 
        w-auto 
        text-lg px-5 py-3 
        md:text-2xl md:px-8 md:py-5
        roboto 
        text-white bg-fuchsia-700`
      }
    >
      <p className={"inline mr-4"}>
        Explore Landmarks
      </p>
      <Image
        src="/rightArrow.svg"
        alt='rightArrow'
        height={40}
        width={40}
        className={
          "inline "
        }
        />
    </Link>
  )
}

export default ExploreLandmarksButton