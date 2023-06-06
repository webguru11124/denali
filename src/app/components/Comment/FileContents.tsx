import styled from '@emotion/styled';
import { ApiFile, FileType, ResponsiveMediaSizes } from 'app/api/types';
import { Carousel, Null, VideoPlayerThumbnail } from 'app/components';
import { createSrcSet, logger } from 'app/utils';
import { FC, useState, useMemo } from 'react';
import ArrowLeftIcon from 'remixicon-react/ArrowLeftSLineIcon';
import ArrowRightIcon from 'remixicon-react/ArrowRightSLineIcon';
import PlayIcon from 'remixicon-react/PlayFillIcon';

import MediaModal from './MediaModal';

interface FileContentsProps {
  files: Array<ApiFile>;
}

const MEDIA_ITEM_HEIGHT = '300px';

const Container = styled.div`
  height: ${MEDIA_ITEM_HEIGHT};
`;

const StyledImage = styled.img`
  max-height: ${MEDIA_ITEM_HEIGHT};
`;

const MediaItemButton = styled.button`
  height: ${MEDIA_ITEM_HEIGHT};
`;

const MediaItemContainer = styled.div`
  height: ${MEDIA_ITEM_HEIGHT};
`;

interface ImageProps {
  sizes: ResponsiveMediaSizes | null;
  name: string;
  src?: string;
}

const displayableTypes = [FileType.image, FileType.video];

const PlayIconContainer = styled.div`
  background-color: rgba(113, 113, 113, 0.8);
  width: 60px;
  height: 60px;
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

const FileContents: FC<FileContentsProps> = ({ files }) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [shouldDisplayMediaModal, setShouldDisplayMediaModal] = useState(false);

  const videosAndImages = useMemo(
    () => files.filter(({ type }) => displayableTypes.includes(type)),
    [files]
  );

  if (!videosAndImages.length) return null;

  const onPrev = () => {
    setSelectedItem((prev) => {
      if (prev === 0) {
        return videosAndImages.length - 1;
      }

      return prev - 1;
    });
  };

  const onNext = () =>
    setSelectedItem((prev) => {
      if (prev === videosAndImages.length - 1) {
        return 0;
      }

      return prev + 1;
    });

  return (
    <Container className="mt-2 bg-gray-dark">
      {shouldDisplayMediaModal && (
        <MediaModal
          onClose={() => setShouldDisplayMediaModal(false)}
          files={videosAndImages}
          initialCurrentFile={selectedItem}
        />
      )}
      <Carousel
        dynamicHeight={false}
        selectedItem={selectedItem}
        renderIndicator={() => <Null />}
        showStatus={false}
        renderArrowNext={() => {
          if (videosAndImages.length === 1 || shouldDisplayMediaModal)
            return null;
          return (
            <button
              type="button"
              className="absolute top-1/2 h-full p-2 transform -translate-y-1/2 right-0 text-white"
              onClick={onNext}
            >
              <ArrowRightIcon />
            </button>
          );
        }}
        renderArrowPrev={() => {
          if (videosAndImages.length === 1 || shouldDisplayMediaModal)
            return null;
          return (
            <button
              type="button"
              className="absolute z-10 top-1/2 h-full p-2 transform -translate-y-1/2 left-0 text-white"
              onClick={onPrev}
            >
              <ArrowLeftIcon />
            </button>
          );
        }}
        showThumbs={false}
        infiniteLoop
      >
        {videosAndImages.map(({ sizes, id, name, type, url }) => {
          const getContent = () => {
            if (type === FileType.image) {
              return <Image sizes={sizes} key={id} src={url} name={name} />;
            }

            return (
              <MediaItemContainer className="relative">
                <PlayIconContainer className="absolute flex items-center justify-center rounded-full z-10 transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <PlayIcon className="w-10 h-10 text-white" />
                </PlayIconContainer>
                <VideoPlayerThumbnail
                  className="w-full h-full"
                  key={id}
                  width="100%"
                  height="100%"
                  src={url}
                />
              </MediaItemContainer>
            );
          };

          return (
            <MediaItemButton
              key={id}
              type="button"
              className="w-full h-full p-0 overflow-hidden"
              onClick={() => setShouldDisplayMediaModal(true)}
            >
              {getContent()}
            </MediaItemButton>
          );
        })}
      </Carousel>
    </Container>
  );
};

export default FileContents;
