'use client'

import React from 'react'
import CreateLandmarkForm from './createLandmarkForm';

export type CreateLandmarkModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

const CreateLandmarkModal = ({
  isOpen,
  onClose
}: CreateLandmarkModalProps) => {
  return (
    <div 
      className={'fixed inset-0 w-screen h-screen flex justify-center items-center z-10 bg-black/80'} 
      onClick={onClose}
    >
      {/* Prevent from closing the form when clicking on the form itself */}
      <div onClick={(event) => {event.stopPropagation()}}>
        {isOpen && ( // Show create landmark modal
          <CreateLandmarkForm onClose={onClose}/>
        )}
      </div>
    </div>
  )
}

export default CreateLandmarkModal;
