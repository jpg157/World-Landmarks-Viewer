'use client'

import React from 'react'
import { LandmarkViewDescriptionButtonProps } from '@/features/landmarksViewAndHomePage/types/landmarkComponentPropTypes/landmarkComponentProps'

const ViewDescriptionButton = ({ onClick }: LandmarkViewDescriptionButtonProps) => {

  return (
    <button
      className={`
        rounded-md
        w-auto
        text-sm px-5 py-1
        md:text-base md:px-2 md:py-2
        roboto
        text-white bg-orange-400
      `}
      onClick={onClick}
    >
    Description
  </button>
  )
}

export default ViewDescriptionButton