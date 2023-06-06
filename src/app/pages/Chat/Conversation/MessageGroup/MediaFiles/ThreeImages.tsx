import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { MessageFile } from 'app/api/chat/types';
import { FC } from 'react';

import UploadedAt from '../UploadedAt';

import MediaFilePreview from './MediaFilePreview';

interface ThreeImagesProps {
  files: Array<MessageFile>;
  uploadedAt: string;
  onFileClick: (index: number) => void;
  isMe: boolean;
}

const ImageContainer = styled.button`
  width: 142px;
  height: 127px;
`;

const ThreeImages: FC<ThreeImagesProps> = ({
  files,
  uploadedAt,
  onFileClick,
  isMe,
}) => {
  if (files.length !== 3) {
    throw new Error('[ThreeImages]: can only contain three images');
  }

  return (
    <div className="flex mt-1">
      <div className="relative">
        {files.map((file, index) => (
          <ImageContainer
            key={file.id}
            onClick={() => onFileClick(index)}
            className={cx({
              'mr-1': index < 2,
            })}
          >
            <MediaFilePreview
              className={cx('w-full h-full object-cover', {
                'rounded-l-xl rounded-r-xs': index === 0 && isMe,
                'rounded-xs': index === 1,
                'rounded-tr-xl rounded-xs': index === 2 && isMe,
                'rounded-xs rounded-tl-xl': index === 0 && !isMe,
                'rounded-r-xl rounded-xs': index === 2 && !isMe,
              })}
              file={file}
            />
          </ImageContainer>
        ))}
        <UploadedAt className="text-white" uploadedAt={uploadedAt} />
      </div>
    </div>
  );
};

export default ThreeImages;
