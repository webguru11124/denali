import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { FC } from 'react';

import { UploadButtonControlsProps } from './types';
import UploadButtonControls from './UploadButtonControls';

interface UploadedImageProps extends UploadButtonControlsProps {
  url: string;
  className?: string;
}

const Image = styled.img`
  height: 268px;
`;

const UploadedImage: FC<UploadedImageProps> = ({
  url,
  className,
  onDeleteClick,
  onAddMoreClick,
}) => (
  <div className={cx('relative flex overflow-hidden', className)}>
    <Image src={url} className="w-full h-full object-cover" alt="upload" />
    <UploadButtonControls
      onDeleteClick={onDeleteClick}
      onAddMoreClick={onAddMoreClick}
    />
  </div>
);

export default UploadedImage;
