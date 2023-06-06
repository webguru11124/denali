import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { MessageFile } from 'app/api/chat/types';
import { FC } from 'react';

import UploadedAt from '../UploadedAt';

import FileOverlay from './FileOverlay';
import MediaFilePreview from './MediaFilePreview';

interface BundledImagesProps {
  files: Array<MessageFile>;
  uploadedAt: string;
  onFileClick: (index: number) => void;
  isMe: boolean;
}

const ITEM_HEIGHT = '130px';
const ITEM_WIDTH = '152px';

const Container = styled.div`
  width: 310px;
`;

const ImageContainer = styled.button`
  width: ${ITEM_WIDTH};
  height: ${ITEM_HEIGHT};
`;

const BundledImages: FC<BundledImagesProps> = ({
  files,
  uploadedAt,
  onFileClick,
  isMe,
}) => {
  if (files.length < 4) {
    throw new Error('[BundledImages]: must contain at least 4 images');
  }

  const leftoverFilesAmount = files.length - 4;
  return (
    <Container
      className={cx('flex flex-wrap relative mt-1', {
        'ml-auto': isMe,
        'mr-auto': !isMe,
      })}
    >
      {files.slice(0, 4).map((file, index) => (
        <ImageContainer
          onClick={() => onFileClick(index)}
          type="button"
          className={cx('mb-1 relative', {
            'mr-1': [0, 2].includes(index),
          })}
          key={file.id}
        >
          <MediaFilePreview
            height={ITEM_HEIGHT}
            width={ITEM_WIDTH}
            className={cx(
              'w-full h-full overflow-hidden object-cover rounded-xs',
              {
                'rounded-tl-xl': index === 0,
                'rounded-tr-xl': index === 1,
                'rounded-bl-xl': index === 2 && isMe,
                'rounded-br-xl': index === 3,
              }
            )}
            file={file}
          />
          {index === 3 && Boolean(leftoverFilesAmount) && (
            <FileOverlay leftoverFilesAmount={leftoverFilesAmount + 1} />
          )}
        </ImageContainer>
      ))}

      <UploadedAt className="text-white" uploadedAt={uploadedAt} />
    </Container>
  );
};

export default BundledImages;
