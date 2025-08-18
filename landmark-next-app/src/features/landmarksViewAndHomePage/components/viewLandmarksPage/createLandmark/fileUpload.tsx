'use client'

import InputErrorLabelsGroup from '@/shared/components/inputErrorLabelsGroup';
import React, { ChangeEvent } from 'react'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { getAllowedFileTypesForInputElement, getAllowedFileTypesReadable } from '@/features/landmarksViewAndHomePage/utils/fileTypes';

type FileUploadComponentProps = {
  currPreviewFile?: File | null;
  previewFileSrc?: string | StaticImport | null;
  onFileSelect: (file: File) => void;
  disabled: boolean;
  fileInputValidationErrors?: string[];
  acceptedFileTypes: string[];
  maxFileSizeMb?: number;
};

const FileUploadComponent = ({
  currPreviewFile,
  previewFileSrc,
  onFileSelect,
  disabled,
  fileInputValidationErrors,
  acceptedFileTypes,
  maxFileSizeMb
}: FileUploadComponentProps) => {
  
  async function handleImageInput(event: ChangeEvent<HTMLInputElement>)
  {
    const file: File | undefined = event.target.files?.[0];
    if (!file) return;
    onFileSelect(file);
  }

  return (
    <div>
      <div 
        className={`
          min-h-[10rem]
          h-full
          w-full
          border-1
          rounded
          ${(fileInputValidationErrors !== undefined) ? "border-error" : "border-black"}
          relative 
          flex flex-col 
          justify-center items-center
          gap-3
        `}
      >
        <h1>Drag and Drop a File here</h1>
        <h1>
          Allowed formats:&nbsp;
          {getAllowedFileTypesReadable(acceptedFileTypes)}
          {maxFileSizeMb && ` (max ${maxFileSizeMb} MB)`}
        </h1>
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
            name="file"
            accept={getAllowedFileTypesForInputElement(acceptedFileTypes)} // allow these file types
            className={`
              opacity-0 w-full h-full absolute 
              ${!disabled && 'hover:cursor-pointer'}
            `}
            onChange={handleImageInput}
          />
          Browse File
        </div>
      </div>
      {fileInputValidationErrors && (
        <InputErrorLabelsGroup errorMessages={fileInputValidationErrors}/>
      )}
      {(previewFileSrc && currPreviewFile) &&
        (
          <div className='mt-4 flex flex-row gap-3 p-3 rounded-lg bg-app-secondary'>
            <Image 
              src={previewFileSrc}
              alt={"uploaded file"}
              width={75}
              height={75}
            />
            <div className='flex flex-col gap-1'>
              <div>{currPreviewFile.name}</div>
              <div>{currPreviewFile.size / 1000}
                &nbsp;KB
                {maxFileSizeMb && ` of ${maxFileSizeMb} MB`}
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default FileUploadComponent
