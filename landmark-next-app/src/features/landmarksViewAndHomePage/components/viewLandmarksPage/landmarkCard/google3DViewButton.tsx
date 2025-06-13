import { Landmark3DViewButtonProps } from '@/features/landmarksViewAndHomePage/types/landmarkComponentPropTypes/landmarkComponentProps'
import { viewLandmarksPageRoute, streetViewPageRoute } from '@/shared/constants/pageRoutes'
import Link from 'next/link'
import React from 'react'

const Landmark3DViewButton = ({ landmarkId }: Landmark3DViewButtonProps) => {

  return (
    <Link href={`${viewLandmarksPageRoute}/${landmarkId}${streetViewPageRoute}`}
      className={`
        rounded-md
        w-auto
        text-sm px-5 py-1
        md:text-base md:px-2 md:py-2
        roboto
        text-white bg-blue-500
      `}
    >
      Explore in 3D View
    </Link>
  )
}

export default Landmark3DViewButton