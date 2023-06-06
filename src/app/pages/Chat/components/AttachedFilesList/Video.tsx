import { useObjectUrl } from 'app/hooks';
import { generateVideoThumbnail } from 'app/utils';
import { FC, useState, useEffect } from 'react';

interface VideoProps {
  file: File;
}

const Video: FC<VideoProps> = ({ file }) => {
  const [thumbSource, setThumbSource] = useState<string | undefined>();
  const objectUrl = useObjectUrl(file);
  useEffect(() => {
    generateVideoThumbnail(objectUrl).then((src) => setThumbSource(src));
  }, [objectUrl]);

  if (!thumbSource) return null;
  return (
    <img
      className="w-full h-full rounded"
      src={thumbSource}
      alt="video to upload"
    />
  );
};

export default Video;
