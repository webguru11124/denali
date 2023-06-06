import { MessageFile } from 'app/api/chat/types';
import { FC } from 'react';

import BundledImages from './BundledImages';
import SingleImage from './SingleImage';
import ThreeImages from './ThreeImages';
import TwoImages from './TwoImages';

interface MediaFileProps {
  files: Array<MessageFile>;
  uploadedAtText: string;
  onFileClick: (index: number) => void;
  isMe: boolean;
}

const MediaFile: FC<MediaFileProps> = ({
  files,
  uploadedAtText,
  isMe,
  onFileClick,
}) => {
  const mediaFilesAmount = files.length;
  if (mediaFilesAmount === 1) {
    return (
      <SingleImage
        isMe={isMe}
        onFileClick={onFileClick}
        uploadedAt={uploadedAtText}
        file={files[0]}
      />
    );
  }

  if (mediaFilesAmount === 2) {
    return (
      <TwoImages
        isMe={isMe}
        onFileClick={onFileClick}
        uploadedAt={uploadedAtText}
        files={files}
      />
    );
  }

  if (mediaFilesAmount === 3) {
    return (
      <ThreeImages
        isMe={isMe}
        onFileClick={onFileClick}
        uploadedAt={uploadedAtText}
        files={files}
      />
    );
  }

  return (
    <BundledImages
      isMe={isMe}
      onFileClick={onFileClick}
      uploadedAt={uploadedAtText}
      files={files}
    />
  );
};

export default MediaFile;
