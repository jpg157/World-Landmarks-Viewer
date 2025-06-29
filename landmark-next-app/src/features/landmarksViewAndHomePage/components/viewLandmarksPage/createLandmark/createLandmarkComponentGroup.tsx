'use client'

import React, { useState } from 'react'
import AuthGuard from '@/features/auth/components/authGuard';
import { UserRolesEnum } from '@/features/auth/constants/userRoles';
import { AUTH0_RETURN_URLS } from '@/shared/constants/auth0ReturnUrls';
import { AuthUser } from '@/features/auth/types';
import { Button } from '@/shared/components/buttons/button';
import { Modal, ModalTitle } from '@/shared/components/modal';
// import { LandmarkForm } from './landmarkForm';
import { BulkCreateLandmarkForm } from './bulkCreateLandmarkForm';
import { LandmarkFormType } from '@/features/landmarksViewAndHomePage/constants/landmarkFormTypeEnum';
import LandmarkFormV2 from './landmarkFormV2';

const CreateLandmarkComponentGroup = ({
  currentUser
}: { currentUser: AuthUser | null } ) => {

  const [createModalShown, setCreateModalShown] = useState<boolean>(false);
  const [bulkCreateModalShown, setBulkCreateModalShown] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-center">
        <div className='flex flex-col gap-1 justify-center items-center'>
          <Button onClick={() => {setCreateModalShown(true)}}
            className={`
              rounded-md
              text-sm px-5 py-3
              md:text-base
              roboto
              text-white bg-app-cyan hover:bg-app-light-cyan
            `}
          >
            Add a New Landmark
          </Button>
          {(currentUser?.roles.includes(UserRolesEnum.ADMIN)) && (
            <>
              <p>Or</p>
              <Button onClick={() => {setBulkCreateModalShown(true)}}
                className={`
                  rounded-md
                  w-fit
                  text-sm px-5 py-3
                  md:text-base
                text-app-primary-text bg-app-secondary hover:bg-app-tertiary
                `}
              >
                Bulk Create
              </Button>
            </>
          )}
        </div>
      </div>

      {createModalShown && (
        <AuthGuard loginReturnUrl={AUTH0_RETURN_URLS.VIEW_LANDMARKS} requiredUserRole={UserRolesEnum.REGULAR_USER}>
          <Modal 
            isOpen={createModalShown}
            onClose={setCreateModalShown}
          >
            <div className='flex flex-col justify-center gap-4'>
              <ModalTitle title={"Add a New Landmark"}/>
              <LandmarkFormV2 
                onClose={setCreateModalShown}
                formType={LandmarkFormType.CREATE}
              />
            </div>
          </Modal>
        </AuthGuard>
      )}

      {(bulkCreateModalShown && currentUser) && (
         // Using AuthGuard component for security in case currentUser was not set correctly
         <AuthGuard loginReturnUrl={AUTH0_RETURN_URLS.VIEW_LANDMARKS} requiredUserRole={UserRolesEnum.ADMIN}>
          <Modal 
            isOpen={bulkCreateModalShown}
            onClose={setBulkCreateModalShown}
          >
            <div className='flex flex-col justify-center gap-4'>
              <ModalTitle title={"Bulk Create Landmarks"}/>
              <BulkCreateLandmarkForm onClose={setBulkCreateModalShown}/>
            </div>
          </Modal>
        </AuthGuard>
      )}
    </>
  )
}

export default CreateLandmarkComponentGroup
