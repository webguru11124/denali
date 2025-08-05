import styled from '@emotion/styled';
import { types as baseTypes } from 'app/api';
import { ResponsiveMediaSizes } from 'app/api/types';
import TypedIconButton from 'app/components/TypedIconButton';
import { useTranslations } from 'app/hooks';
import { createSrcSet, logger } from 'app/utils';
import React, { FC, useState } from 'react';

import FileContents from './FileContents';

interface CommentProps {
  text: string;
  files?: Array<baseTypes.ApiFile>;
  likesCount: number;
  likedByMe: boolean;
  onLike: () => void;
}

interface ImageProps {
  sizes: ResponsiveMediaSizes | null;
  name: string;
  src?: string;
}

const MEDIA_ITEM_HEIGHT = '460px';

const StyledImage = styled.img`
  max-height: ${MEDIA_ITEM_HEIGHT};
`;

const Image: FC<ImageProps> = ({ sizes, name, src }) => {
  const [failed, setFailed] = useState<boolean>(false);
  const srcSet = sizes && !failed ? createSrcSet(sizes) : undefined;

  return (
    <StyledImage
      className="object-cover"
      srcSet={srcSet}
      src={src}
      alt={name}
      onError={() => {
        logger.warn(`Failed to load image. Fallbacking to original image`, {
          src,
          srcSet,
          name,
        });
        setFailed(true);
      }}
    />
  );
};

const Comment: React.FC<CommentProps> = ({
  text,
  files,
  likedByMe,
  likesCount,
  onLike,
}) => {
  const {
    translations: [translatedText],
    toggleTranslation,
    isTranslating,
    isTranslated,
  } = useTranslations([text]);

  return (
    <div>
      <div className="ml-10 mt-2">
        {files && <FileContents files={files} />}
        <p className="text-grayscale-primary text-sm break-words">{translatedText}</p>
        <div className="flex text-grayscale-secondary items-center mt-2">
          <TypedIconButton onClick={onLike} isActive={likedByMe} variant="like" />
          <p className="text-xs ml-1">{likesCount}</p>
          <TypedIconButton
            onClick={toggleTranslation}
            isActive={isTranslated}
            isLoading={isTranslating}
            variant="translate"
            className="ml-4"
          />
        </div>
      </div>
    </div>
  )
};

export default Comment;
