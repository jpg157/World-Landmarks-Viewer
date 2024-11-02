import Link from 'next/link'
import React from 'react'

const Google3DViewButton = () => {
  return (
    <Link href="/"
      className={`
        rounded-md
        w-auto
        text-sm px-5 py-1
        md:text-base md:px-2 md:py-2
        roboto
        text-white bg-purple-600
      `}
    >
      Explore in 3D View
    </Link>
  )
}

export default Google3DViewButton