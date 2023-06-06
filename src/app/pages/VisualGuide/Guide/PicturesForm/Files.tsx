import { PreUploadFile, FileUploadResponse } from 'app/api/media/types';
import { useVMGuidesTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';

import File from './File';

interface FilesProps {
  files: Array<PreUploadFile>;
  onFileUploaded: (file: FileUploadResponse) => void;
  onFileDelete: (fileId: string) => void;
}

const Files: FC<FilesProps> = ({ files, onFileDelete, onFileUploaded }) => {
  const { t } = useVMGuidesTranslation();

  return (
    <div className="bg-grayscale-bg-dark overflow-x-auto pt-4 pb-3 px-3 flex mx-4 rounded-t-lg shadow-atobi">
      {files.length ? (
        files.map(({ id, ...restFileProps }) => (
          <File
            key={id}
            onFileDelete={onFileDelete}
            onFileUploaded={onFileUploaded}
            file={{ id, ...restFileProps }}
          />
        ))
      ) : (
        <p className="text-grayscale-secondary">
          {t('Follow the guide and share your feedback.')}
        </p>
      )}
    </div>
  );
};

export default Files;
