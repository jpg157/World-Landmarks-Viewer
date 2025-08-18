'use client'

import { createLandmark } from '@/features/landmarksViewAndHomePage/api/landmarksView/createLandmark';
import { updateLandmark } from '@/features/landmarksViewAndHomePage/api/landmarksView/updateLandmark';
import { uploadLandmarkImageFile } from '@/features/landmarksViewAndHomePage/api/landmarksView/uploadLandmarkImageFile';
import { CREATE_LANDMARK_STORAGE_PREFIX, landmarkDescriptionFormField, landmarkImageFileFormField, landmarkNameFormField, MAX_LANDMARK_DESCRIPTION_LENGTH, MAX_LANDMARK_FILE_SIZE_BYTES, MAX_LANDMARK_FILE_SIZE_MB, UPDATE_LANDMARK_STORAGE_PREFIX } from '@/features/landmarksViewAndHomePage/constants/createLandmarkConstants';
import { LandmarkFormType } from '@/features/landmarksViewAndHomePage/constants/landmarkFormTypeEnum';
import { CreateLandmarkFormErrors } from '@/features/landmarksViewAndHomePage/types/createLandmarkFormTypes';
import { Landmark } from '@/features/landmarksViewAndHomePage/types/landmarks';
import { setAntiforgeryTokenHeaders } from '@/shared/api/security/setAntiforgeryTokenHeaders';
import { Button } from '@/shared/components/buttons/button';
import { localStorage } from '@/shared/utils/localStorage';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { z } from 'zod';
import FileUploadComponent from './fileUpload';
import InputErrorLabelsGroup from '@/shared/components/inputErrorLabelsGroup';
import { ALLOWED_IMAGE_FILE_TYPES } from '@/features/landmarksViewAndHomePage/constants/fileConstants';
import { getAllowedFileTypesForValidation, getAllowedFileTypesReadable } from '@/features/landmarksViewAndHomePage/utils/fileTypes';
import { LoadingSpinner } from '@/shared/components/spinner';
import { getLandmarkById } from '@/features/landmarksViewAndHomePage/api/landmarksView/getLandmarkById';
import { ServerActionResponse } from '@/shared/types';

// Create landmark form validation schema
const landmarkSchema = z.object({
  name: z.string().nonempty("Please enter a landmark name"),
  description: z.string().nonempty("Please enter a landmark description"),
  imgFile: z
    .instanceof(File, { message: "Please upload a file." })
    .refine(
      (file) => file.size <= MAX_LANDMARK_FILE_SIZE_BYTES, 
      `Max image size must be less than ${MAX_LANDMARK_FILE_SIZE_MB} MB.`
    )
    .refine(
      (file) => `${getAllowedFileTypesForValidation(ALLOWED_IMAGE_FILE_TYPES, "image")}`.includes(file.type.toLowerCase()),
      `Only ${getAllowedFileTypesReadable(ALLOWED_IMAGE_FILE_TYPES)} formats are supported.`
    )
  // landmarkLocation: , //TODO
});

const landmarkImgSchema = landmarkSchema.pick({
  imgFile: true
});

type LandmarkData = Pick<Landmark, 'name' | 'description'> // | 'landmarkLocation'
  & { imgFile: File | null };

type ValidationFormResult = 
  { success: false; validationFieldErrors: CreateLandmarkFormErrors } | 
  { 
    success: true; 
    data: LandmarkData
  };

type LandmarkFormProps = {
  onClose: (open: boolean) => void;
  formType: LandmarkFormType;
  landmarkId?: number;
};

const LandmarkForm = ({
  onClose,
  formType,
  landmarkId
}: LandmarkFormProps) => {

  const router = useRouter();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const [descriptionInputLength, setDescriptionInputLength] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrcUrl, setImageFileUrl] = useState<string | null>(null);
  // Form data error states containing messages from client-side validation
  const [formInputErrors, setFormInputErrors] = useState<CreateLandmarkFormErrors>({});
  const [pending, setPending] = useState(false);

  

  function getFormPrefixFromType(): string {
    const formPrefix: string = (formType === LandmarkFormType.CREATE) 
      ? CREATE_LANDMARK_STORAGE_PREFIX
      : UPDATE_LANDMARK_STORAGE_PREFIX

    return formPrefix;
  }

  async function populateFormFields() {

    if (!nameInputRef.current || !descriptionInputRef.current) {
      return;
    }

    switch (formType) {
      case LandmarkFormType.CREATE:
      {
        // Get data saved in localstorage
        const savedDataPrefix = getFormPrefixFromType();

        nameInputRef.current.value        = localStorage.getValue(`${savedDataPrefix}${landmarkNameFormField}`) ?? "";
        descriptionInputRef.current.value = localStorage.getValue(`${savedDataPrefix}${landmarkDescriptionFormField}`) || "";
        break;
      }
      case (LandmarkFormType.UPDATE):
      {
        // Get landmark data from server by landmark id
        try {
          if (!landmarkId) {
            throw new Error("There was a problem while fetching landmark data");
          }
          
          const getByIdResponse = await getLandmarkById(landmarkId);
          
          if (!getByIdResponse.ok) {
            throw new Error(getByIdResponse.errorMessage);
          }

          const landmark: Landmark = getByIdResponse.data;
          
          nameInputRef.current.value        = landmark.name;
          descriptionInputRef.current.value = landmark.description;
        }
        catch (error) {
          alert(`landmarkId: ${landmarkId}`);
          alert((error instanceof Error) ? error.message : "There was a problem while fetching landmark data");
        }
        break;
      }
    }
  }

  // Populate form fields on first render
  useEffect(() => {
    populateFormFields();
  }, [nameInputRef.current, descriptionInputRef.current]);

  // Save a form field input to local storage or delete it
  function updateSavedLandmarkInput(inputFieldId: string, deleteSaved: boolean) {

    const savedDataPrefix: string = getFormPrefixFromType();

    let key: string;
    let value: string;

    switch (inputFieldId) {
      case (landmarkNameFormField): {
        key = `${savedDataPrefix}${landmarkNameFormField}`;
        value = nameInputRef.current?.value || "";
        if (value) {
          setFormInputErrors(prevFormInputErrors => ({
            ...prevFormInputErrors,
            name: undefined
          }));
        }
        break;
      }
      case (landmarkDescriptionFormField): {
        key = `${savedDataPrefix}${landmarkDescriptionFormField}`;
        value = descriptionInputRef.current?.value || "";
        if (value) {
          setFormInputErrors(prevFormInputErrors => ({
            ...prevFormInputErrors,
            description: undefined
          }));
        }
        break;
      }
      default: {
        //TODO: error notification
        alert("An error occurered while updating form data");
        return;
      }
    }

    if (!deleteSaved)
      localStorage.setValue(key, value);
    else
      localStorage.deleteEntry(key);
  }

  function saveImageFileAndSrcPath(file: File) {

    // validate entered file
    const { success, error, data } = landmarkImgSchema.safeParse({
      imgFile: file
    });

    if (!success) {
      
      const validationFieldErrors = error.flatten().fieldErrors;
      
      setFormInputErrors((prevInputErrors) => {
        return {
          ...prevInputErrors,
          imgFile: validationFieldErrors.imgFile,
        };
      });

      return;
    }

    const imageFile: File = data.imgFile;

    // release memory of old file object url
    if (imageSrcUrl) {
      URL.revokeObjectURL(imageSrcUrl);
    }
    
    const imageUrl: string = URL.createObjectURL(imageFile);

    // clear file input errors, if any
    setFormInputErrors(prevFormInputErrors => ({
      ...prevFormInputErrors,
      imgFile: undefined
    }));

    setImageFile(imageFile);
    setImageFileUrl(imageUrl);
  }

  // Client side validation for submitted form data
  function validateFormFields({ 
    name, 
    description, 
    imgFile 
  }: LandmarkData): ValidationFormResult
  {
    // Validate form fields
    const { success, error, data } = landmarkSchema.safeParse({
      name,
      description,
      imgFile,
      // landmarkLocation?: LandmarkLocationData //TODO
    });
  
    // If zod validation was not successful (some data was invalid)
    if (!success) {
      const validationFieldErrors = error.flatten().fieldErrors;
      return { success, validationFieldErrors };
    }
    return { success, data };
  }

  async function handleLandmarkFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validate form fields - return if unsuccessful
    const validationResult = validateFormFields({
        name: nameInputRef.current?.value || "",
        description: descriptionInputRef.current?.value || "",
        imgFile: imageFile
        // landmarkLocation?: LandmarkLocationData //TODO
      });

    // if success is false, data should not be undefined (according to zod safeParse return types)
    if (!validationResult.success) {
      const fieldErrors = validationResult.validationFieldErrors;
      
      setFormInputErrors({
        name: fieldErrors.name,
        description: fieldErrors.description,
        // landmarkLocation: fieldErrors.landmarkLocation,
        imgFile: fieldErrors.imgFile,
      });

      return;
    }

    createOrUpdate(validationResult.data);
  }

  async function createOrUpdate(data: LandmarkData) {

    setPending(true);

    try {
      const landmarkResponse = (formType === LandmarkFormType.CREATE)
        ? await createLandmark(data)
        : await updateLandmark(data); // formType === LandmarkFormType.UPDATE

      if (!landmarkResponse) {
        throw new Error("Error while attempting to create or update landmark");
      }
    
      if (!landmarkResponse.ok) {
        throw new Error(landmarkResponse.errorMessage);
      }

      const newLandmarkExclImage = landmarkResponse.data;

      // Create FormData object to send to server
      const formData: FormData = new FormData(); // FormData is set of key/value pairs representing form fields and values - can be used for sending content-type of multipart/formdata
            
      // File parameter name needs to match the form file name in the request containing the formdata
      formData.append("imageFile", data.imgFile!);
      
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

      // clear form data from local storage and object url
      updateSavedLandmarkInput(landmarkNameFormField, true);
      updateSavedLandmarkInput(landmarkDescriptionFormField, true);

      if (imageSrcUrl) {
        URL.revokeObjectURL(imageSrcUrl);
      }

      router.refresh();
      onClose(false);
    }
    catch (error) {
      if (error instanceof Error) {
        alert(error.message || "There was a problem while attempting to create the landmark");
      }
    }
    finally {
      setPending(false);
    }
  }

  return (
    <form 
      className='flex flex-col justify-center gap-4'
      onSubmit={handleLandmarkFormSubmit}
    >
      <div className={`flex flex-row justify-between gap-10`}>
        <label htmlFor={landmarkNameFormField}>Landmark Name</label>
        <div className='flex flex-col'>
          <input
            type='text'
            name={landmarkNameFormField}
            id={landmarkNameFormField}
            ref={nameInputRef}
            onChange={() => updateSavedLandmarkInput(landmarkNameFormField, false)}
            className={`
              m-0 py-0 ps-2 pe-0 
              border-1 rounded-sm 
              h-10 w-[30vw]
              focus:outline-2  focus:outline-app-cyan
              ${formInputErrors.name && 'border-error'}
            `}
            disabled={pending}
          />
          {formInputErrors.name && (
            <InputErrorLabelsGroup errorMessages={formInputErrors.name}/>
          )}
        </div>
      </div>

      <div className={`flex flex-row justify-between gap-10`}>
        <label htmlFor={landmarkDescriptionFormField}>Landmark Description</label>
         <div className='flex flex-col'>
          <div className="flex flex-col gap-1">
            <textarea
              name={landmarkDescriptionFormField}
              id={landmarkDescriptionFormField}
              maxLength={MAX_LANDMARK_DESCRIPTION_LENGTH}
              ref={descriptionInputRef}
              onChange={() => {
                updateSavedLandmarkInput(landmarkDescriptionFormField, false)
                setDescriptionInputLength(descriptionInputRef.current?.textLength || 0);
              }}
              className={`
                m-0 py-2 px-2 
                border-1 rounded-sm 
                h-50 w-[30vw]
                resize-y max-h-143 min-h-50
                focus:outline-2 focus:outline-app-cyan
                ${formInputErrors.description && 'border-error'}
              `}
              disabled={pending}
            >
            </textarea>
            <p>{descriptionInputLength}&nbsp;/&nbsp;{MAX_LANDMARK_DESCRIPTION_LENGTH}</p>
          </div>
          {formInputErrors.description && (
            <InputErrorLabelsGroup errorMessages={formInputErrors.description}/>
          )}
        </div>
      </div>
      
      <div className='flex flex-row justify-between gap-10'>
        <p className='p-0 m-0 inline-block'>Upload Photos</p>
        <div className='w-[30vw]'>
          <FileUploadComponent
            currPreviewFile={imageFile}
            previewFileSrc={imageSrcUrl} 
            fileInputValidationErrors={formInputErrors.imgFile} 
            onFileSelect={saveImageFileAndSrcPath}
            disabled={pending}
            acceptedFileTypes={ALLOWED_IMAGE_FILE_TYPES}
            maxFileSizeMb={MAX_LANDMARK_FILE_SIZE_MB}
          />
        </div>
      </div>
      <Button 
        type='submit'
        disabled={pending}
        className={`
          rounded-sm
          w-auto
          text-sm px-5 py-3
          md:text-base md:px-2 md:py-3
          roboto
          border-1
          focus:bg-app-light-cyan
          ${pending
            ? 'bg-app-tertiary text-white hover:cursor-auto'
            : 'bg-app-cyan hover:bg-app-light-cyan text-white'
          }
        `}
      >
        { pending 
          ? 
          <div className='flex justify-center items-center'>
            <LoadingSpinner color='white' size={25}/>
          </div>
          : 
          'Create'
        }
      </Button>
    </form>
  )
}

export default LandmarkForm
