import React from 'react'
import Link from 'next/link';
import { viewLandmarksPageRoute, addNewlandmarkPageRoute } from '@/shared/constants/PageRoutes';

const AddNewLandmarkButton = () => {

  return (

    <Link href={`${viewLandmarksPageRoute}/${addNewlandmarkPageRoute}`}
      className={`
        rounded-md
        w-auto
        text-sm px-5 py-3
        md:text-base md:px-2 md:py-3
        roboto
        text-white bg-green-500
      `}
    >
      Add a New Landmark
    </Link>
  )
}

export default AddNewLandmarkButton