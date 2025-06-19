'use client'

import InputErrorLabel from '@/shared/components/inputErrorLabel';
import InputErrorLabelsGroup from '@/shared/components/inputErrorLabelsGroup';
import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

type FileUploadComponentProps = {
  fileImageSrc: string | StaticImport | undefined;
  onFileSelect: (file: File) => void;
  disabled: boolean;
  fileInputValidationErrors?: string[];
  acceptedFileTypes: string[];
  maxFileSizeMb?: number;
};

const FileUploadComponent = ({
  fileImageSrc,
  onFileSelect, 
  disabled,
  fileInputValidationErrors, 
  acceptedFileTypes,
  maxFileSizeMb
}: FileUploadComponentProps) => {

  const [previewFile, setPreviewFile] = useState<File | null>();
  const [showFileSizeError, setShowFileSizeError] = useState<boolean>(false);

  function getAcceptedFileTypes(
    acceptedFileTypes: string[], 
    semantic: boolean
  ) {
    const acceptedFileTypesString = acceptedFileTypes.reduce((accumulator, currFileType, index) => {
      const fileType = (semantic) ? currFileType.replace(".", "").toUpperCase() : currFileType;
      accumulator += (index === 0 ? fileType : `, ${fileType}`);
      return accumulator;
    }, "");

    return acceptedFileTypesString;
  }

  async function loadAndPreviewImage(event: ChangeEvent<HTMLInputElement>)
  {
    const file: File | undefined = event.target.files?.[0];
    if (!file) return;

    // validate file size if maxFileSizeMb param not undefined
    const fileSizeBytes = file.size / 1000;
    if (maxFileSizeMb && (fileSizeBytes > maxFileSizeMb * 1000))
    {
      setShowFileSizeError(true);
      return;
    }

    //todo: store the setFile in the Form, not in the file upload component
    // and pass the file into the fileUplaod component from the form
    setPreviewFile(file);
    onFileSelect(file)
    setShowFileSizeError(false);
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
          ${showFileSizeError || (fileInputValidationErrors !== undefined) ? "border-error" : "border-black"}
          relative 
          flex flex-col 
          justify-center items-center
          gap-3
        `}
      >
        <h1>Drag and Drop a File here</h1>
        <h1>
          Allowed formats:&nbsp;
          {getAcceptedFileTypes(acceptedFileTypes, true)}
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
            accept={getAcceptedFileTypes(acceptedFileTypes, false)} // allow these file types
            className={`
              opacity-0 w-full h-full absolute 
              ${!disabled && 'hover:cursor-pointer'}
            `}
            onChange={loadAndPreviewImage}
          />
          Browse File
        </div>
      </div>
      {showFileSizeError && (
        <InputErrorLabel errorMessage="Over the file size limit."/>
      )}
      {fileInputValidationErrors && (
        // <InputErrorLabel errorMessage="Please enter an file."/>
        <InputErrorLabelsGroup errorMessages={fileInputValidationErrors}/>
      )}
      {(fileImageSrc && previewFile) &&
        (
          <div className='mt-4 flex flex-row gap-3 p-3 rounded-lg bg-app-secondary'>
            <Image 
              src={fileImageSrc}
              alt={"uploaded file"}
              width={75}
              height={75}
            />
            <div className='flex flex-col gap-1'>
              <div>{previewFile.name}</div>
              <div>{previewFile.size / 1000}
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
