import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { MessageFile } from 'app/api/chat/types';
import { FC } from 'react';

import UploadedAt from '../UploadedAt';

import MediaFilePreview from './MediaFilePreview';

const Container = styled.button`
  height: 263px;
  width: 308px;
`;

interface SingleImageProps {
  file: MessageFile;
  uploadedAt: string;
  isMe: boolean;
  onFileClick: (index: number) => void;
}

const SingleImage: FC<SingleImageProps> = ({
  uploadedAt,
  file,
  onFileClick,
  isMe,
}) => (
  <Container
    type="button"
    onClick={() => onFileClick(0)}
    className="ml-auto relative mt-1"
  >
    <UploadedAt className="text-white" uploadedAt={uploadedAt} />
    <MediaFilePreview
      className={cx('w-full h-full object-cover rounded-t-lg', {
        'rounded-l-lg rounded-br-xs': isMe,
        'rounded-r-lg rounded-bl-xs': !isMe,
      })}
      file={file}
    />
  </Container>
);

export default SingleImage;
