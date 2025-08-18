function formatFileType(
  fileType: string,
  readableFormat?: boolean,
  mimeType?: string
): string {
  const fileTypeFormattedDot = (mimeType || readableFormat) ? fileType.replace(".", "") : fileType;
  const fileTypeIfMime = (mimeType) ? `${mimeType}/${fileTypeFormattedDot}` : fileTypeFormattedDot; 
  const formattedFileType = (readableFormat) ? fileTypeIfMime.toUpperCase() : fileTypeIfMime;
  return formattedFileType;
}

function getAllowedFileTypes(
  acceptedFileTypes: string[], 
  asString: boolean,
  readableFormat?: boolean,
  mimeType?: string
): string | string[] {
  let result: string[] | string;
  
  if (asString) 
  {
    result = acceptedFileTypes.reduce(
      (accumulator, currFileType, index) => {
        const formattedFileType = formatFileType(currFileType, readableFormat, mimeType);
        const seperator = (readableFormat) ? ", " : ",";
        accumulator += ( (index === 0) ? formattedFileType : `${seperator}${formattedFileType}`);
        return accumulator;
      }, 
    ""
    );
  }
  else {
    result = acceptedFileTypes.map(
      fileType => {
        const formattedFileType = formatFileType(fileType, readableFormat, mimeType);
        return formattedFileType;
      }
    );
  }

  return result;
}

function getAllowedFileTypesForValidation(
  allowedFileTypes: string[], 
  mimeType: string
): string[] {
  return getAllowedFileTypes(allowedFileTypes, false, false, mimeType) as string[];
}

function getAllowedFileTypesReadable(
  allowedFileTypes: string[]
): string {
  return getAllowedFileTypes(allowedFileTypes, true, true) as string;
}

function getAllowedFileTypesForInputElement(
  allowedFileTypes: string[]
): string {
  return getAllowedFileTypes(allowedFileTypes, true, false) as string;
}

export {
  getAllowedFileTypesForValidation,
  getAllowedFileTypesReadable,
  getAllowedFileTypesForInputElement
};
