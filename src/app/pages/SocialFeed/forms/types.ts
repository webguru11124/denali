export interface ImperativeFileButtonHandlerProps {
  click: () => void;
}

export interface UploadButtonControlsProps {
  onAddMoreClick: () => void;
  onDeleteClick: () => void;
}

export interface FileWithMetadata {
  file?: File;
  src: string;
  isUploaded: boolean;
  id: string;
}

export type UploadFunction = (file: Array<File>) => void;
export type DeleteFunction = (file: FileWithMetadata) => void;

export interface FileToDelete {
  id: string;
}

export interface UpdatePostFormState {
  files: Array<FileWithMetadata>;
  videos: Array<FileWithMetadata>;
  images: Array<FileWithMetadata>;
  content: string;
  filesToRemove: Array<FileToDelete>;
}
