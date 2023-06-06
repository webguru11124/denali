import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { MessageFile } from 'app/api/chat/types';
import config from 'app/config';
import { useChatTranslation } from 'app/internationalization/hooks';
import take from 'lodash/take';
import React, { FC, useCallback, useMemo } from 'react';

import { groupChatFiles } from '../utils';

import MediaFilePreview from './MessageGroup/MediaFiles/MediaFilePreview';

const maxVisibleMediaCount = 4;
const mediaItemWidth = 46;
const mediaCardShift = 8;

const ImagesContainer = styled.div`
  height: 40px;
`;

const ImageContainer = styled.div`
  width: ${mediaItemWidth}px;
  height: 40px;
`;

const Dot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 1.5px;
  background-color: ${config.colors['gray-dark']};
`;

interface Props {
  className?: string;
  files: MessageFile[];
}

const ReplyAttachments: FC<Props> = (props) => {
  const { className, files } = props;
  const { t } = useChatTranslation();
  const { media } = useMemo(() => groupChatFiles(files), [files]);
  const filteredMedia = useMemo<MessageFile[]>(
    () => take(media, maxVisibleMediaCount),
    [media]
  );

  const mediasWidth = useMemo<number>(
    () => mediaItemWidth + (filteredMedia.length - 1) * mediaCardShift,
    [filteredMedia.length]
  );

  const getMediaItemLeftPosition = useCallback<(index: number) => number>(
    (index: number) => mediaCardShift * index,
    []
  );

  return (
    <div className={cx('flex items-center', className)}>
      <span className="text-grayscale-secondary text-xs">
        {t('{{count}} attachments', { count: files.length })}
      </span>
      <Dot className="mr-2 ml-2" />
      {media.length > 0 && (
        <ImagesContainer
          style={{ width: mediasWidth }}
          className="relative flex items-center"
        >
          {take(media, maxVisibleMediaCount).map((mediaItem, index) => (
            <ImageContainer
              style={{ left: getMediaItemLeftPosition(index) }}
              className="border-white border-2 rounded overflow-hidden absolute"
              key={mediaItem.id}
            >
              <MediaFilePreview file={mediaItem} />
            </ImageContainer>
          ))}
        </ImagesContainer>
      )}
    </div>
  );
};

export default ReplyAttachments;
