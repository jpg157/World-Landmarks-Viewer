export type ServerActionResponse<T> = 
{ ok: true; data: T; } | 
{ ok: false; errorMessage: string; }
