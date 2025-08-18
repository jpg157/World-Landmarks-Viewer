'use client'

import React, { useState } from 'react'
import LandmarkImage, { LandmarkImageProps } from '../landmarkImage/landmarkImage';
import { Button } from '@/shared/components/buttons/button';
import { NavLink } from '@/shared/components/buttons/navLink';
import { streetViewPageRoute, viewLandmarksPageRoute } from '@/shared/constants/pageRoutes';
import { UserRolesEnum } from '@/features/auth/constants/userRoles';
import { isAuthorizedUser } from '@/features/auth/lib/userRoles';
import { deleteLandmark } from '@/features/admin/api/deleteLandmark';
import { ConfirmationDialog } from '@/shared/components/confirmationDialog';
import { useRouter } from 'next/navigation';
import { AuthUser } from '@/features/auth/types';
import { AUTH0_RETURN_URLS } from '@/shared/constants/auth0ReturnUrls';
import AuthGuard from '@/features/auth/components/authGuard';
import { Modal, ModalTitle } from '@/shared/components/modal';
import LandmarkForm from './createLandmark/landmarkForm';
import { LandmarkFormType } from '../../constants/landmarkFormTypeEnum';

export type LandmarkCardProps = {
  landmarkId: number;
  landmarkName: string;
  landmarkDescription: string;
  imageProps: LandmarkImageProps;
  currentUser: AuthUser | undefined | null;
};

const LandmarkCard = ({
  landmarkId,
  landmarkName,
  landmarkDescription,
  imageProps,
  currentUser
}: LandmarkCardProps) => {

  const router = useRouter();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const showDescription = () => {
    alert(landmarkDescription);
  }

  const handleDelete = async () => {
    const deleteLandmarkRes = await deleteLandmark({ id: landmarkId });

    if (!deleteLandmarkRes.ok) {
      alert(deleteLandmarkRes.errorMessage);
      return;
    }

    alert(`Successfully delete landmark ${landmarkName} with id ${landmarkId}`);
    router.refresh();
  }

  const [updateModalShown, setUpdateModalShown] = useState(false);

  return (
    <>
      <div className='p-1 transition delay-75 border border-transparent hover:border-app-primary-text rounded-md'>
        <div className='h-[30vh]'>
          <LandmarkImage {...(imageProps)}></LandmarkImage>
        </div>

        <div className='flex flex-col gap-1 items-center justify-center mt-2'>
          <h1 className={`
              inline-block
              text-sm
              md:text-lg
              roboto
            `}
          >
            {landmarkName}
          </h1>
          
          <div className='flex flex-col gap-1 items-center justify-center'>
            <div className='flex gap-1 items-center justify-center'>
              <NavLink
                href={`${viewLandmarksPageRoute}/${landmarkId}${streetViewPageRoute}`}
                className='rounded-md text-sm md:text-base md:px-2 md:py-2 text-white bg-blue-500'
              >
                Explore in 3D View
              </NavLink>
              <Button
                  className={`
                    rounded-md
                    text-sm
                    md:text-base md:px-2 md:py-2
                    text-white bg-orange-400
                  `}
                  onClick={showDescription}
                >
                Description
              </Button>
            </div>
            {currentUser && isAuthorizedUser(currentUser.roles, UserRolesEnum.ADMIN) && (
              <div className='flex gap-1 items-center justify-center'>
                <Button
                  className={`
                    rounded-md
                    text-sm
                    md:text-base md:px-2 md:py-2
                    text-white bg-app-cyan
                  `}
                  onClick={() => setUpdateModalShown(true)}
                >
                  Update
                </Button>

                <Button
                  className={`
                    rounded-md
                    text-sm
                    md:text-base md:px-2 md:py-2
                    text-white bg-app-destructive
                  `}
                  onClick={() => setShowDeleteConfirmation(true)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Update landmark modal */}

      {updateModalShown && (
        <AuthGuard loginReturnUrl={AUTH0_RETURN_URLS.VIEW_LANDMARKS} requiredUserRole={UserRolesEnum.ADMIN}>
          <Modal 
            isOpen={updateModalShown}
            onClose={setUpdateModalShown}
          >
            <div className='flex flex-col justify-center gap-4'>
              <ModalTitle title={`Update Landmark - ${landmarkName}`}/>
              <LandmarkForm 
                onClose={setUpdateModalShown}
                formType={LandmarkFormType.UPDATE}
                landmarkId={landmarkId}
              />
            </div>
          </Modal>
        </AuthGuard>
      )}

      {/* Delete landmark confirmation */}

      <ConfirmationDialog 
        isOpen={showDeleteConfirmation}
        onClose={setShowDeleteConfirmation}
        title={"Delete Landmark"}
        confirmationMessage={`Delete the landmark ${landmarkName}? (id # ${landmarkId})`}
        onConfirm={handleDelete}
      />

    </>
  );
}

export default LandmarkCard
