import Link from 'next/link'
import React from 'react'

const ViewDescriptionButton = () => {
  return (
    <Link href="/"
      className={`
        rounded-md
        w-auto
        text-sm px-5 py-1
        md:text-base md:px-2 md:py-2
        roboto
        text-white bg-blue-500
      `}
    >
    Description
  </Link>
  )
}

export default ViewDescriptionButton