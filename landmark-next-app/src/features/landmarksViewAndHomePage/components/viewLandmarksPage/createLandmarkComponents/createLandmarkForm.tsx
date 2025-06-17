'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import { LANDMARK_STORAGE_PREFIX, landmarkDescriptionFormField, landmarkImageFileFormField, landmarkNameFormField, MAX_LANDMARK_DESCRIPTION_LENGTH } from '@/features/landmarksViewAndHomePage/constants/createLandmarkConstants'
import ImageUploadComponent from './imageUpload'
import { localStorage } from '@/shared/utils/localStorage'
import { createLandmark } from '@/features/landmarksViewAndHomePage/api/landmarksView/createLandmark'
import { CreateLandmarkFormData, CreateLandmarkFormErrors } from '@/features/landmarksViewAndHomePage/types/createLandmarkFormTypes'
import { z } from 'zod'
import { Landmark } from '@/features/landmarksViewAndHomePage/types/landmarks'
import { uploadLandmarkImageFile } from '@/features/landmarksViewAndHomePage/api/landmarksView/uploadLandmarkImageFile'
import InputErrorLabelsGroup from '@/shared/components/inputErrorLabelsGroup'
import { setAntiforgeryTokenHeaders } from '@/shared/api/security/setAntiforgeryTokenHeaders'
import { useRouter } from 'next/navigation';
import { CloseIconButton } from '@/shared/components/buttons/closeIconButton'

// Create landmark form validation schema
const landmarkSchema = z.object({
  landmarkName: z.string().nonempty(),
  landmarkDescription: z.string().nonempty(),
  landmarkImgFile: z.instanceof(File) // not null and is a File object
  // landmarkCreationDate? //TODO
  // landmarkLocation?: LandmarkLocationData //TODO
});

type CreateLandmarkFormProps = {
  onClose: () => void;
}

const CreateLandmarkForm = ({ 
  onClose 
}: CreateLandmarkFormProps) => {

  const router = useRouter();

  // Form data for controlled input fields 
  const [controlledFormData, setControlledFormData] = useState<CreateLandmarkFormData>(getLocalStorageFormData());
  
  // Form data error states containing messages (client-side validation)
  const [formInputErrors, setFormInputErrors] = useState<CreateLandmarkFormErrors>({});
  
  // Data is sending to server state
  const [isPending, setIsPending] = useState<boolean>(false);

  // Description text area character count
  const [landmarkDescriptionLength, setLandmarkDescriptionLength] = useState(0);

  function updateLandmarkDescriptionLength(event: FormEvent<HTMLTextAreaElement>) {
    const textAreaElem = event.target as HTMLTextAreaElement;
    setLandmarkDescriptionLength(textAreaElem.textLength)
  }

  function saveInputElementValue(event: FormEvent<HTMLInputElement>) {
    const inputElem = event.target as HTMLInputElement;
    setControlledFormData(prevFormData => ({
      ...prevFormData,
      landmarkName: inputElem.value
    }));
    setFormInputErrors(prevFormErrors => ({
      ...prevFormErrors,
      landmarkNameErrors: undefined
    }));
  }

  function saveTextAreaValue(event: FormEvent<HTMLTextAreaElement>) {
    const textAreaElem = event.target as HTMLTextAreaElement;
    setControlledFormData(prevFormData => ({
      ...prevFormData,
      landmarkDescription: textAreaElem.value
    }));
    setFormInputErrors(prevFormErrors => ({
      ...prevFormErrors,
      landmarkDescriptionErrors: undefined
    }));
  }

  function saveImageFileAndSrcPath(file: File) {
    const imageUrl: string = URL.createObjectURL(file);
    setControlledFormData(prevFormData => ({
      ...prevFormData,
      landmarkImgUrl: imageUrl,
      landmarkImgFile: file
    }));
    setFormInputErrors(prevFormErrors => ({
      ...prevFormErrors,
      landmarkImgFileErrors: undefined
    }));
  }

  // Client side validation for submitted form data
  function validateFormFields()
  {
      // Validate form fields
      const { success, error, data } = landmarkSchema.safeParse({
        landmarkName: controlledFormData.landmarkName,
        landmarkDescription: controlledFormData.landmarkDescription,
        landmarkImgFile: controlledFormData.landmarkImgFile,
        // landmarkLocation?: LandmarkLocationData //TODO
      });
    
      // If zod validation was not successful (some data was invalid)
      if (!success) {
        const validationFieldErrors = error.flatten().fieldErrors;

        setFormInputErrors({
          landmarkNameErrors: validationFieldErrors.landmarkName,
          landmarkDescriptionErrors: validationFieldErrors.landmarkDescription,
          landmarkImgFileErrors: validationFieldErrors.landmarkImgFile,
        });
      }
      return { success, data };
  }

  // Submit form state data
  // handles creation of FormData object to pass into server function
  async function handleFormSubmit() { // uncontrolled form input data unused

    // Validate form fields - return if unsuccessful
    const { success, data } = validateFormFields();

    // if success is false, data should not be undefined (according to zod safeParse return types)
    if (!success || data === undefined) return;

    // Create new landmark with validated data
    const landmarkData: Landmark = {
      name: data.landmarkName,
      description: data.landmarkDescription,
      // landmarkCreationDate? //TODO
      // landmarkLocation?: LandmarkLocationData //TODO
    }

    setIsPending(true);

    try {
      const createLandmarkRes = await createLandmark(landmarkData);

      if (!createLandmarkRes.ok) {
        throw new Error(createLandmarkRes.errorMessage);
      }

      const newLandmarkExclImage = createLandmarkRes.data;

      // Create FormData object to send to server
      const formData: FormData = new FormData(); // FormData is set of key/value pairs representing form fields and values - can be used for sending content-type of multipart/formdata
      formData.append(landmarkImageFileFormField, data.landmarkImgFile);
      
      // Make second post request to server sending the image file (id passed in should match the server-side held id of the landmark)

      // Set antiforgery tokens in browser which are required for subsequent form data post request
      const setAntiforgeryTokenHeadersRes = await setAntiforgeryTokenHeaders();
      
      if (!setAntiforgeryTokenHeadersRes.ok) {
        throw new Error(setAntiforgeryTokenHeadersRes.errorMessage);
      }
      
      const uploadLandmarkImageFileRes = await uploadLandmarkImageFile({
        landmarkId: newLandmarkExclImage.id,
        formData: formData,
      });

      if (!uploadLandmarkImageFileRes.ok) {
        throw new Error(uploadLandmarkImageFileRes.errorMessage);
      }

      // to avoid memory leaks
      if (controlledFormData.landmarkImgUrl) {
        URL.revokeObjectURL(controlledFormData.landmarkImgUrl);
      }

      // clear form data local storage
      localStorage.deleteEntry(`${LANDMARK_STORAGE_PREFIX}${landmarkNameFormField}`);
      localStorage.deleteEntry(`${LANDMARK_STORAGE_PREFIX}${landmarkDescriptionFormField}`);
      // localStorage.deleteEntry(`${LANDMARK_STORAGE_PREFIX}imageFile`);
      // localStorage.deleteEntry(`${LANDMARK_STORAGE_PREFIX}imageUrl`);

      router.refresh();
      onClose();
    }
    catch (error) {
      if (error instanceof Error) {
        alert(error.message || "There was a problem while attempting to create the landmark");
      }
    }
    finally {
      setIsPending(false);
    }
  }

  // Save to local storage each time one of the values change
  useEffect(() => {

    localStorage.setValue(`${LANDMARK_STORAGE_PREFIX}${landmarkNameFormField}`, controlledFormData.landmarkName)
    localStorage.setValue(`${LANDMARK_STORAGE_PREFIX}${landmarkDescriptionFormField}`, controlledFormData.landmarkDescription)
    // localStorage.setValue(`${LANDMARK_STORAGE_PREFIX}imageFile`, formData.landmarkImgFile);
    // localStorage.setValue(`${LANDMARK_STORAGE_PREFIX}imageUrl`, formData.landmarkImgUrl)
  },
  [controlledFormData.landmarkName, 
    controlledFormData.landmarkDescription,
    controlledFormData.landmarkImgFile,
    controlledFormData.landmarkImgUrl]
  );

  

  function getLocalStorageFormData(): CreateLandmarkFormData {
    
    const lsName: string = localStorage.getValue(`${LANDMARK_STORAGE_PREFIX}${landmarkNameFormField}`) ?? "";
    const lsDescription: string = localStorage.getValue(`${LANDMARK_STORAGE_PREFIX}${landmarkDescriptionFormField}`) ?? "";
    // const lsImageFile: File | null = localStorage.getValue(`${LANDMARK_STORAGE_PREFIX}imageFile`) ?? null;
    // const lsImageUrl: string | undefined = localStorage.getValue(`${LANDMARK_STORAGE_PREFIX}imageUrl`) ?? undefined;
  
    const formData: CreateLandmarkFormData = {
      landmarkName: lsName,
      landmarkDescription: lsDescription,
      landmarkImgFile: null,
      landmarkImgUrl: undefined
    }

    return formData;
  }

  // Register keydown event to handle when user presses 'Esc' key
  useEffect(() => {
    
    const handleKeyDown = (event: KeyboardEvent) => {
      // Allow Esc key to close the form, but prevent Esc from closing the form while data is being processed
      if (!isPending && event.key === "Escape") onClose();
    }

    window.onkeydown = handleKeyDown;
    return () => {window.removeEventListener("keydown", handleKeyDown)}
    
  }, [isPending]);

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      handleFormSubmit();
    }}
    className={`
      z-50
      shadow-lg
      flex flex-col justify-center
      gap-4
      py-12
      px-12
      bg-white
      rounded-md
      relative
      `}
    >
      <CloseIconButton onClick={onClose} className='absolute top-4 right-4'/>
      
      <h1 className={`
        inline-block 
        text-lg 
        md:text-2xl 
        roboto
        self-center
        `}
      >
        Add a New Landmark
      </h1>
      <div> 
        <div className={`flex flex-row justify-between gap-10`}>
            <label htmlFor="landmark_name" className="m-0 p-0 inline">Landmark Name</label>
            <div className='flex flex-col'>
            <input 
              disabled={isPending}
              type="text" 
              name="landmark_name"
              id="landmark_name"
              value={controlledFormData.landmarkName}
              className={`
                m-0 py-0 ps-2 pe-0 
                border-1 rounded-sm 
                h-10 w-[30vw]
                focus:outline-2  focus:outline-app-cyan
                ${formInputErrors.landmarkNameErrors && 'border-error'}
              `}
              onInput={saveInputElementValue}
              />
              {formInputErrors.landmarkNameErrors && (
                <InputErrorLabelsGroup errorMessages={formInputErrors.landmarkNameErrors}/>
              )}
            </div>
        </div>
        
      </div>
      <div>
        <div className={`flex flex-row justify-between gap-10`}>
          <label htmlFor="landmark_description" className="m-0 p-0 inline">Description</label>
          <div className='flex flex-col'>
            <div className="flex flex-col gap-1">
              <textarea
                disabled={isPending}
                name="landmark_description"
                id="landmark_description"
                value={controlledFormData.landmarkDescription}
                maxLength={MAX_LANDMARK_DESCRIPTION_LENGTH}
                className={`
                  m-0 py-2 px-2 
                  border-1 rounded-sm 
                  h-50 w-[30vw]
                  resize-y max-h-143 min-h-50
                  focus:outline-2 focus:outline-app-cyan
                  ${formInputErrors.landmarkNameErrors && 'border-error'}
                `}
                onInput={(event) => {
                  saveTextAreaValue(event);
                  updateLandmarkDescriptionLength(event);
                }}
              >
              </textarea>
              <p>{landmarkDescriptionLength}/{MAX_LANDMARK_DESCRIPTION_LENGTH}</p>
            </div>
            {formInputErrors.landmarkDescriptionErrors && (
              // <InputErrorLabel errorMessage='Please enter a landmark description.'/>
              <InputErrorLabelsGroup errorMessages={formInputErrors.landmarkDescriptionErrors}/>
            )}
          </div>
        </div>
        
      </div>
      <div className='flex flex-row justify-between gap-10'>
        <p className='p-0 m-0 inline-block'>Upload Photos</p>
        <ImageUploadComponent 
          heightRem={10} 
          vWidth={30} 
          imageUrl={controlledFormData.landmarkImgUrl} 
          fileInputValidationErrors={formInputErrors.landmarkImgFileErrors} 
          onFileSelect={saveImageFileAndSrcPath}
          disabled={isPending}
        />
      </div>
    
      <button 
        key={1}
        type="submit"
        disabled={isPending}
        className={`
          rounded-sm
          w-auto
          text-sm px-5 py-3
          md:text-base md:px-2 md:py-3
          roboto
          hover: cursor-pointer
          border-1
          focus:bg-app-light-cyan
          ${
          isPending
            ? 'bg-app-tertiary text-white'
            : 'bg-app-cyan hover:bg-app-light-cyan text-white'
          }
        `}
      >
        { isPending ? '...' : 'Create' } {/* TODO: render spinner while pending is true */}
      </button>
    
    </form>
  )
}

export default CreateLandmarkForm
