'use client'

import { MAX_LANDMARK_FILE_SIZE_BYTES, MAX_LANDMARK_FILE_SIZE_MB } from '@/features/landmarksViewAndHomePage/constants/createLandmarkConstants';
import InputErrorLabel from '@/shared/components/inputErrorLabel';
import InputErrorLabelsGroup from '@/shared/components/inputErrorLabelsGroup';
import React, { ChangeEvent, useState } from 'react'

type ImageUploadComponentProps = {
  heightRem: number,
  vWidth: number,
  imageUrl: string | undefined,
  fileInputValidationErrors?: string[],
  onFileSelect: (file: File) => void;
  disabled: boolean;
};

const ImageUploadComponent = ({
  heightRem, 
  vWidth, 
  imageUrl, 
  fileInputValidationErrors, 
  onFileSelect, 
  disabled
}: ImageUploadComponentProps) => {
  
  const [fileName, setFileName] = useState<string>();
  const [fileSize, setfileSize] = useState<number>();
  const [showFileSizeError, setShowFileSizeError] = useState<boolean>(false);

  async function loadAndPreviewImage(event: ChangeEvent<HTMLInputElement>)
  {
    const file: File | undefined = event.target.files?.[0];
    if (!file) return;

    // validate image size
    if ((file.size / 1000) > MAX_LANDMARK_FILE_SIZE_BYTES)
    {
      setShowFileSizeError(true);
      return;
    }

    setFileName(file.name);
    setfileSize(file.size/1000);
    onFileSelect(file)
    setShowFileSizeError(false);
  }

  return (
    <div>
      <div 
        style={{ height: `${heightRem}rem` }}
        className={`
          w-[${vWidth}vw] 
          border-1
          ${showFileSizeError || (fileInputValidationErrors !== undefined) ? "border-error" : "border-black"}
          relative 
          flex flex-col 
          justify-center items-center
          gap-3
        `}
      >
        <h1>Drag and Drop a File here</h1>
        <h1>JPEG, PNG formats {"("}max {`${MAX_LANDMARK_FILE_SIZE_MB} MB)`}</h1>
        <div 
          className={`
            border-1 rounded-md 
            relative 
            py-1 px-4 
            bg-app-secondary border-app-secondary 
            ${!disabled && 'hover:bg-app-tertiary hover:border-app-tertiary'}
            focus-within:outline-2  focus-within:outline-app-cyan
          `}
        >
          <input 
            disabled={disabled}
            type="file" 
            name="landmark_image"
            accept="image/jpeg, image/jpg, image/png" // allow these image file types
            className={`
              opacity-0 w-full h-full absolute 
              ${!disabled && 'hover:cursor-pointer'}
            `}
            onChange={loadAndPreviewImage}
          />
          Browse File
        </div>
      </div>
      {fileInputValidationErrors && (
        // <InputErrorLabel errorMessage="Please enter an image of this landmark."/>
        <InputErrorLabelsGroup errorMessages={fileInputValidationErrors}/>
      )}
      {showFileSizeError && (
        <InputErrorLabel errorMessage="Over the file size limit."/>
      )}
      {(imageUrl !== undefined) &&
        (
          <div className='mt-4 flex flex-row gap-3 p-3 rounded-lg bg-app-secondary'>
            <img src={`${imageUrl}`} width="75px" className=''/>
            <div className='flex flex-col gap-1'>
              <div>{fileName}</div>
              <div>{fileSize} KB of {MAX_LANDMARK_FILE_SIZE_MB} MB</div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ImageUploadComponent
