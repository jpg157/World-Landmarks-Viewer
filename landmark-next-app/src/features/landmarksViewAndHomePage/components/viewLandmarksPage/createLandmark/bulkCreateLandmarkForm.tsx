'use client'

import React, { useState } from 'react'
import FileUploadComponent from './fileUpload';
// import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Button } from '@/shared/components/buttons/button';
import { ALLOWED_DATA_FILE_TYPES } from '@/features/landmarksViewAndHomePage/constants/fileConstants';
import InputErrorLabelsGroup from '@/shared/components/inputErrorLabelsGroup';
import { createMultipleLandmarks } from '@/features/landmarksViewAndHomePage/api/landmarksView/createMultipleLandmarks';
import { LoadingSpinner } from '@/shared/components/spinner';
// import jsonFileIcon from '@/images/fileTypeIcons/json-logo.png';
// import csvFileIcon from '@/images/fileTypeIcons/csv-logo.png'

type BulkCreateLandmarkFormProps = {
  onClose: (open: boolean) => void;
};

export const BulkCreateLandmarkForm = ({
  onClose
}: BulkCreateLandmarkFormProps) => {

  // const [dataFile, setDataFile] = useState<File | null>(null)
  // const [dataFileImage, setDataFileImage] = useState<StaticImport | undefined>(undefined);
  
  const [landmarkDataJson, setLandmarkDataJson] = useState<string>("");
  const [landmarkDataError, setLandmarkDataError] = useState<string | undefined>();
  const [dataFileError, setDataFileError] = useState<string[] | undefined>();
  const [pending, setPending] = useState(false);

  //todo: validate file type
  // function validateSetDataFile(file: File) {
  //   if (ALLOWED_DATA_FILE_TYPES.includes(file.type)) {}
  // }

  function updateLandmarksTextData(event: React.FormEvent<HTMLTextAreaElement>) {
    const inputElem = event.target as HTMLInputElement;
    setLandmarkDataJson(inputElem.value);
    setLandmarkDataError(undefined);
  }

  
  function handleFileSelect(file: File) {

  //todo: check file type first (json or csv)
    // validate entered file type
    // const fileType = file.type;

    // parse the file and set json data textarea
    const fileReader = new FileReader();

    fileReader.addEventListener("load", () => {
      const fileTextData = fileReader.result as string;
      
      // validate json data by parsing
      try {
        const data = JSON.parse(fileTextData);
        if (!Array.isArray(data)) {
          setDataFileError(["Invalid json format in selected file (top level object should be an array without a key)"]);
          return;
        }
      }
      catch (error) {
        setDataFileError(["Invalid json in selected file"]);
        return;
      }

      // Set data, file and file image
      setLandmarkDataJson(fileTextData);
      // setDataFile(file);
      // setFileImage(file);

      // Remove previous data errors if there were any
      setDataFileError(undefined);
      setLandmarkDataError(undefined);

    }, false);

    fileReader.addEventListener("error", () => {
      setDataFileError(["An error occured while attempting to read the data file"]);
    });

    fileReader.readAsText(file);
  }

  // function setFileImage(file: File) {
  //   let fileIcon = undefined;
  //   switch(file.type) {
  //     case ("application/json"): {
  //       fileIcon = jsonFileIcon;
  //       break;
  //     }
  //     case ("text/csv"): {
  //       fileIcon = csvFileIcon;
  //       break;
  //     }
  //   }
  //   setDataFileImage(fileIcon);
  // }

  async function handleFormSubmit() {
    setPending(true);
    try {
      const data = JSON.parse(landmarkDataJson);

      //todo: client side validation
      if (!Array.isArray(data)) {
        setLandmarkDataError("Invalid json format (do not include the key property name before the array)");
        return;
      }

      const response = await createMultipleLandmarks(data);

      if (!response.ok) {
        setLandmarkDataError(response.errorMessage);
        return;
      }

      onClose(false);
    }
    catch (error) {
      let errorMessage = "There was a problem while processing landmark data";
      if (error instanceof SyntaxError) {
        errorMessage = "Invalid json format"
      }
      else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setLandmarkDataError(errorMessage);
    }
    finally {
      setPending(false);
    }
  }

  function submitDisabled() {
    return !landmarkDataJson || pending;
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleFormSubmit();
      }}
      className={`
        flex flex-col justify-center
        gap-4
      `}
    >
      <div className={`flex flex-col gap-4`}>
        <label htmlFor="landmark_data_json" className="m-0 p-0 inline">Paste json data</label>
        <div className='flex flex-col'>
          <div className="flex flex-col gap-1">
            <textarea
              disabled={pending}
              name="landmark_data_json"
              id="landmark_data_json"
              value={landmarkDataJson}
              // maxLength={MAX_LANDMARK_DESCRIPTION_LENGTH} // ignore maxlength for now
              className={`
                m-0 py-2 px-2 
                border-1 rounded-sm 
                h-50 w-[30vw]
                resize-y max-h-143 min-h-50
                focus:outline-2 focus:outline-app-cyan
                ${landmarkDataError && 'border-error'}
              `}
              onInput={updateLandmarksTextData}
            >
            </textarea>
          </div>
          {landmarkDataError && (
            // <InputErrorLabel errorMessage='Please enter a landmark description.'/>
            <InputErrorLabelsGroup errorMessages={[landmarkDataError]}/>
          )}
        </div>
      </div>

      <p className='text-center'>Or</p>

      <FileUploadComponent 
        disabled={pending}
        // fileImageSrc={null}//{dataFileImage} // Not used
        onFileSelect={handleFileSelect}
        fileInputValidationErrors={dataFileError}
        acceptedFileTypes={ALLOWED_DATA_FILE_TYPES}
      />

      <Button
        type="submit"
        disabled={submitDisabled()}
        className={`
          py-3 rounded
          ${submitDisabled()
            ? "text-white bg-app-tertiary hover:cursor-auto"
            : "text-white bg-app-cyan hover:bg-app-light-cyan"
          }
        `}
      >
        { pending 
          ? 
          <div className='flex flex-row justify-center items-center'>
            <LoadingSpinner color='white' size={25}/>
          </div>
          : 
          'Create'
        }
      </Button>
    </form>
  )
}
