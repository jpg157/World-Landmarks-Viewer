'use client'

import React, { useState } from 'react'
import AuthGuard from '@/features/auth/components/authGuard';
import { UserRolesEnum } from '@/features/auth/constants/userRoles';
import { AUTH0_RETURN_URLS } from '@/shared/constants/auth0ReturnUrls';
import { AuthUser } from '@/features/auth/types';
import { Button } from '@/shared/components/buttons/button';
import CreateLandmarkModal from './createLandmarkModal';
import { Modal, ModalTitle } from '@/shared/components/modal';
import { BulkCreateLandmarkForm } from './bulkCreateLandmarkForm';

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
          {currentUser && (
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
          <CreateLandmarkModal 
            isOpen={createModalShown} 
            onClose={() => {setCreateModalShown(false)}}
          />
        </AuthGuard>
      )}

      {(bulkCreateModalShown && currentUser) && (
         // Using AuthGuard component for security purposes in case currentUser was not set correctly
         <AuthGuard loginReturnUrl={AUTH0_RETURN_URLS.VIEW_LANDMARKS} requiredUserRole={UserRolesEnum.ADMIN}>
          {/* <BulkCreateLandmarkModal 
            isOpen={bulkCreateModalShown} 
            onClose={() => {setBulkCreateModalShown(false)}}
          /> */}
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
