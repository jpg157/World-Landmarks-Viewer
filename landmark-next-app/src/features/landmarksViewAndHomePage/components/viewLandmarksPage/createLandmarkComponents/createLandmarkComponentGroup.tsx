'use client'

import React, { useState } from 'react'
import AuthGuard from '@/features/auth/components/authGuard';
import { UserRolesEnum } from '@/features/auth/constants/userRoles';
import CreateLandmarkModal from './createLandmarkModal';
import { AUTH0_RETURN_URLS } from '@/shared/constants/auth0ReturnUrls';

const CreateLandmarkComponentGroup = () => {

  const [formShown, setFormShown] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-center">
            <button onClick={() => {setFormShown(true)}}
              className={`
                rounded-md
                w-auto
                text-sm px-5 py-3
                md:text-base md:px-2 md:py-3
                roboto
                text-white bg-app-cyan
                hover: cursor-pointer
              `}
            >
              Add a New Landmark
            </button>
      </div>
      {formShown && (
        <AuthGuard loginReturnUrl={AUTH0_RETURN_URLS.VIEW_LANDMARKS} requiredUserRole={UserRolesEnum.REGULAR_USER}>
          <CreateLandmarkModal 
            isOpen={formShown} 
            onClose={() => {setFormShown(false)}}
          />
        </AuthGuard>
      )}
    </>
  )
}

export default CreateLandmarkComponentGroup
