import { useFileUploadMutation } from 'app/api/media/hooks';
import { PreUploadFile, FileUploadResponse } from 'app/api/media/types';
import { FileType } from 'app/api/types';
import { Spinner, MediaThumbnail } from 'app/components';
import { useObjectUrl } from 'app/hooks';
import { isImage } from 'app/utils';
import { FC, useEffect } from 'react';
import CloseIcon from 'remixicon-react/CloseCircleFillIcon';

interface FileProps {
  file: PreUploadFile;
  onFileUploaded: (file: FileUploadResponse) => void;
  onFileDelete: (fileId: string) => void;
}

const File: FC<FileProps> = ({
  file: { file, id },
  onFileDelete,
  onFileUploaded,
}) => {
  const { mutate, isLoading } = useFileUploadMutation();
  const fileUrl = useObjectUrl(file);

  useEffect(() => {
    mutate(
      { id, file },
      {
        onSuccess: ({ data }) => {
          onFileUploaded(data);
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-12 h-12 min-w-12 flex justify-center items-center bg-grayscale-secondary mr-8 rounded-xs relative">
      <button
        onClick={() => onFileDelete(id)}
        type="button"
        disabled={isLoading}
        className="absolute top-0 right-0 rounded-full bg-white transform -translate-y-1/2 translate-x-1/2"
      >
        <CloseIcon className="w-6 h-6 text-grayscale-secondary" />
      </button>
      {!isLoading ? (
        <MediaThumbnail
          className="w-full h-full object-cover rounded-xs"
          url={fileUrl}
          type={isImage(file) ? FileType.image : FileType.video}
          alt={file.name}
        />
      ) : (
        <Spinner className="m-0 text-xs" />
      )}
    </div>
  );
};

export default File;
