import { Spinner } from 'app/components';
import { isImage, isVideo } from 'app/utils';
import { FC, useEffect } from 'react';
import DeleteIcon from 'remixicon-react/CloseCircleFillIcon';

import { useFileUpload } from '../../hooks';

import File from './File';
import Image from './Image';
import Video from './Video';

interface AttachedFileProps {
  file: File;
  onRemove: () => void;
  onUploaded: (uploadedId: string) => void;
}

const AttachedFile: FC<AttachedFileProps> = ({
  file,
  onRemove,
  onUploaded,
}) => {
  const { upload, isLoading } = useFileUpload();

  useEffect(() => {
    upload(file, {
      onSuccess: onUploaded,
      onError: onRemove,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFile = () => {
    if (isImage(file)) {
      return <Image file={file} />;
    }

    if (isVideo(file)) {
      return <Video file={file} />;
    }

    return <File file={file} />;
  };

  return (
    <div className="relative rounded flex justify-center items-center bg-gray-light w-12 h-12">
      <button
        type="button"
        onClick={onRemove}
        className="absolute z-20 right-0 top-0 transform -translate-y-1/2 translate-x-1/2 p-0.5 rounded-full bg-white"
      >
        <DeleteIcon className="text-grayscale-secondary w-6 h-6 border-white rounded-full" />
      </button>
      {isLoading && (
        <div className="absolute bg-gray-light opacity-50 rounded flex items-center justify-center z-10 w-full h-full">
          <Spinner />
        </div>
      )}
      {renderFile()}
    </div>
  );
};

export default AttachedFile;
