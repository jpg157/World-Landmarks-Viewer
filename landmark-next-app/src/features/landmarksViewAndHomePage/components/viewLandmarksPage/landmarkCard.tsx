'use client'

import React, { useState } from 'react'
import LandmarkImage from '../landmarkImage/landmarkImage';
import { LandmarkCardProps } from '@/features/landmarksViewAndHomePage/types/landmarkComponentPropTypes/landmarkComponentProps';
import { Button } from '@/shared/components/buttons/button';
import { NavLink } from '@/shared/components/buttons/navLink';
import { streetViewPageRoute, viewLandmarksPageRoute } from '@/shared/constants/pageRoutes';
import { UserRolesEnum } from '@/features/auth/constants/userRoles';
import { isAuthorizedUser } from '@/features/auth/lib/userRoles';
import { deleteLandmark } from '@/features/admin/api/deleteLandmark';
import { ConfirmationDialog } from '@/shared/components/confirmationDialog';
import { useRouter } from 'next/navigation';

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
    alert(landmarkDescription); //TODO: implement card flip animation, also display landmarkDescription on opposite side of card
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

  return (
    // TODO: make the card expand EQUALLY in all directions when hovered
    <>
      <div className='transition hover:scale-105'>
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
            )}
          </div>
        </div>
      </div>

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
