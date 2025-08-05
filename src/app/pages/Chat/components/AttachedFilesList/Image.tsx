import { useObjectUrl } from 'app/hooks';
import { FC } from 'react';

interface ImageProps {
  file: File;
}

const Image: FC<ImageProps> = ({ file }) => {
  const objectUrl = useObjectUrl(file);

  return (
    <img
      src={objectUrl}
      alt="file to upload"
      className="w-full h-full rounded"
    />
  );
};

export default Image;
