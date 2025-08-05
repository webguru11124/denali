import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { MessageFile } from 'app/api/chat/types';
import { FC } from 'react';

import UploadedAt from '../UploadedAt';

import MediaFilePreview from './MediaFilePreview';

interface TwoImagesProps {
  files: Array<MessageFile>;
  uploadedAt: string;
  onFileClick: (index: number) => void;
  isMe: boolean;
}

const ImageContainer = styled.button`
  width: 150px;
  height: 127px;
`;

const TwoImages: FC<TwoImagesProps> = ({
  files,
  uploadedAt,
  onFileClick,
  isMe,
}) => {
  if (files.length !== 2) {
    throw new Error('[TwoImages]: can only contain two images');
  }

  return (
    <div className="flex ml-auto mt-1">
      <div
        className={cx('relative', {
          'ml-auto': isMe,
          'mr-auto': !isMe,
        })}
      >
        {files.map((file, index) => (
          <ImageContainer
            type="button"
            onClick={() => onFileClick(index)}
            key={file.id}
            className="mr-1"
          >
            <MediaFilePreview
              file={file}
              className={cx('w-full h-full object-cover', {
                'rounded-l-xl rounded-r-xs mr-1': index === 0 && isMe,
                'rounded-tr-xl rounded-xs': index === 1 && isMe,
                'rounded-tl-xl rounded-xs mr-1': index === 0 && !isMe,
                'rounded-r-xl rounded-xs': index === 1 && !isMe,
              })}
            />
          </ImageContainer>
        ))}
        <UploadedAt className="text-white" uploadedAt={uploadedAt} />
      </div>
    </div>
  );
};

export default TwoImages;
