export type ServerActionResponse<T> = 
{ ok: true; data: T; } | 
{ ok: false; errorMessage: string; }

export type ValidationError = {
  propertyName: string;
  errorMessage: string;
}

export type ValidationErrors = ValidationError[];
