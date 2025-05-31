import { viewLandmarksPageRoute } from '@/shared/constants/PageRoutes'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import rightArrow from '@/images/rightArrow.svg'

function ExploreLandmarksButton() {
  return (
    <Link href={viewLandmarksPageRoute}
      className={
        `rounded-full
        w-auto
        text-lg px-5 py-3 
        md:text-2xl md:px-8 md:py-5
        roboto 
        text-white bg-blue-500`
      }
    >
      <p className={"inline mr-4"}>
        Explore Landmarks
      </p>
      <Image
      src={rightArrow}
      alt="rightArrow"
      height={40}
      width={40}
      className={
        "inline"
      }
      />
    </Link>
  )
}

export default ExploreLandmarksButton