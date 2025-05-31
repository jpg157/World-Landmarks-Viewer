'use client'

import React, { useState } from 'react'
import CreateNewLandmarkForm from './createNewLandmarkForm';

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
        // Show create landmark modal
        <div 
          className={'fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-10 bg-black/80'} 
          onClick={() => {setFormShown(false)}}
        >
          {/* Prevent from closing the form when clicking on the form itself */}
          <div onClick={(event) => {event.stopPropagation()}}>
            <CreateNewLandmarkForm onClose={() => {setFormShown(false)}}/>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateLandmarkComponentGroup
