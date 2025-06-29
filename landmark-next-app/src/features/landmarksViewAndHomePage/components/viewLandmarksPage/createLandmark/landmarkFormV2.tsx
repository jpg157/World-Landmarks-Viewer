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
import React, { useActionState, useEffect, useRef, useState } from 'react'
import { z } from 'zod';
import FileUploadComponent from './fileUpload';
import InputErrorLabelsGroup from '@/shared/components/inputErrorLabelsGroup';
import { ALLOWED_IMAGE_FILE_TYPES } from '@/features/landmarksViewAndHomePage/constants/fileConstants';

// Create landmark form validation schema
const landmarkSchema = z.object({
  name: z.string().nonempty("Please enter a landmark name"),
  description: z.string().nonempty("Please enter a landmark description"),
  imgFile: z
    .any()
    .refine((file) => file instanceof File, "Please enter an file.")
    .refine((file) => file.size <= MAX_LANDMARK_FILE_SIZE_BYTES, `Max image size must be less than ${MAX_LANDMARK_FILE_SIZE_MB}MB.`)
    .refine((file) => ALLOWED_IMAGE_FILE_TYPES.includes(file.type),
      `Only ${ALLOWED_IMAGE_FILE_TYPES.forEach((imgFormat => { return `${imgFormat},`; } ))} formats are supported.`
    ) // not null and is a File object
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

type LandmarkFormV2Props = {
  onClose: (open: boolean) => void;
  formType: LandmarkFormType;
};

const LandmarkFormV2 = ({
  onClose,
  formType
}: LandmarkFormV2Props) => {

    const router = useRouter();

  // const count = useRef<number>(0)

  // useEffect(() => {
  //   count.current += 1;
  // })

  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const [descriptionInputLength, setDescriptionInputLength] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrcUrl, setImageFileUrl] = useState<string | null>(null);

  // Form data error states containing messages (client-side validation)
  const [formInputErrors, setFormInputErrors] = useState<CreateLandmarkFormErrors>({});

  const [pending, setPending] = useState(false);

  // Populate form fields on first render
  useEffect(() => {
    if (nameInputRef.current && descriptionInputRef.current) {
      nameInputRef.current.value        = localStorage.getValue(landmarkNameFormField) || "";
      descriptionInputRef.current.value = localStorage.getValue(landmarkDescriptionFormField) || "";
    }
  }, [nameInputRef.current, descriptionInputRef.current]);

  // Save form field inputs to local storage
  function updateSavedLandmarkInput(inputFieldId: string, deleteSaved: boolean) {

    const formPrefix: string = (formType === LandmarkFormType.CREATE) 
      ? CREATE_LANDMARK_STORAGE_PREFIX
      : UPDATE_LANDMARK_STORAGE_PREFIX

    let key: string;
    let value: string;

    switch (inputFieldId) {
      case (landmarkNameFormField): {
        key = `${formPrefix}${landmarkNameFormField}`;
        value = nameInputRef.current?.value || "";
        break;
      }
      case (landmarkDescriptionFormField): {
        key = `${formPrefix}${landmarkDescriptionFormField}`;
        value = descriptionInputRef.current?.value || "";
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
    const { success, error, data } = landmarkImgSchema.safeParse({file});

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
    const imageUrl: string = URL.createObjectURL(imageFile);

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
        name: nameInputRef.current?.textContent || "",
        description: descriptionInputRef.current?.textContent || "",
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
      formData.append(landmarkImageFileFormField, data.imgFile!);
      
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
      updateSavedLandmarkInput(landmarkNameFormField, false);
      updateSavedLandmarkInput(landmarkDescriptionFormField, false);
      URL.revokeObjectURL(imageSrcUrl || "");

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
      className='flex flex-col'
      onSubmit={handleLandmarkFormSubmit}
    >
      
      {/* <p>{count.current}</p> */}
      <label htmlFor={landmarkNameFormField}>Landmark Name</label>
      <input
        type='text'
        name={landmarkNameFormField}
        id={landmarkNameFormField}
        ref={nameInputRef}
        onChange={() => updateSavedLandmarkInput(landmarkNameFormField, true)}
        className='border-1'
        disabled={pending}
      />
      {formInputErrors.description && (
        <InputErrorLabelsGroup errorMessages={formInputErrors.description}/>
      )}

      <label htmlFor={landmarkDescriptionFormField}>Landmark Description</label>
      <textarea
        name={landmarkDescriptionFormField}
        id={landmarkDescriptionFormField}
        maxLength={MAX_LANDMARK_DESCRIPTION_LENGTH}
        ref={descriptionInputRef}
        onChange={() => {
          updateSavedLandmarkInput(landmarkDescriptionFormField, true)
          setDescriptionInputLength(descriptionInputRef.current?.textLength || 0);
        }}
        className='border-1'
        disabled={pending}
      >
      </textarea>
      <p>{descriptionInputLength}&nbsp;/&nbsp;{MAX_LANDMARK_DESCRIPTION_LENGTH}</p>
      {formInputErrors.description && (
        <InputErrorLabelsGroup errorMessages={formInputErrors.description}/>
      )}
      
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
          hover: cursor-pointer
          border-1
          focus:bg-app-light-cyan
          ${pending
            ? 'bg-app-tertiary text-white'
            : 'bg-app-cyan hover:bg-app-light-cyan text-white'
          }
        `}
      >
        { pending ? '...' : 'Create' } {/* TODO: render spinner while pending is true */}
      </Button>
    </form>
  )
}

export default LandmarkFormV2
