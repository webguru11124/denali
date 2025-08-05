import { FC } from 'react';

import { FileWithMetadata } from '../../types';

import AttachedFile from './AttachedFile';

interface AttachedFilesListProps {
  files: Array<FileWithMetadata>;
  onRemove: (id: string) => void;
  onFileUploaded: (id: string, uploadedId: string) => void;
}

const AttachedFilesList: FC<AttachedFilesListProps> = ({
  files,
  onRemove,
  onFileUploaded,
}) => (
  <div className="px-3 pb-2 flex flex-wrap bg-grayscale-bg-dark border-t border-l border-r border-gray-light rounded-t-xl">
    {files.map(({ id, file }) => (
      <div key={id} className="mr-5 mt-5 inline-block">
        <AttachedFile
          onUploaded={(uploadedId) => onFileUploaded(id, uploadedId)}
          onRemove={() => onRemove(id)}
          file={file}
        />
      </div>
    ))}
  </div>
);

export default AttachedFilesList;
