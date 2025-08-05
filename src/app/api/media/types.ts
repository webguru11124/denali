export interface FileUploadResponse {
  id: string;
  name: string;
  originalName: string;
}

export interface PreUploadFile {
  file: File;
  id: string;
}
