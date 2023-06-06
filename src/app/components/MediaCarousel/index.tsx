import styled from '@emotion/styled';
import { ApiMediaFile } from 'app/api/types';
import { Carousel } from 'app/components';
import { selectDefinedImageSource, isImage } from 'app/utils';
import { FC, useState } from 'react';
import ArrowLeftIcon from 'remixicon-react/ArrowLeftSLineIcon';
import ArrowRightIcon from 'remixicon-react/ArrowRightSLineIcon';

import UncontrolledVideoPlayer from '../UncontrolledVideoPlayer';

import CarouselArrow from './CarouselArrow';
import CarouselItemIndicator from './CarouselItemIndicator';
import MediaModal from './MediaModal';

interface MediaCarouselProps {
  files: Array<ApiMediaFile>;
  onItemClick?: (file: ApiMediaFile) => void;
}

const ITEM_HEIGHT = `283px`;

const CarouselItem = styled.button`
  height: ${ITEM_HEIGHT};
`;

const MediaCarousel: FC<MediaCarouselProps> = ({ files, onItemClick }) => {
  const [selectedFilePreview, setSelectedFilePreview] =
    useState<ApiMediaFile | null>(null);
  const hasMultipleFiles = files.length > 1;

  return (
    <>
      {selectedFilePreview && (
        <MediaModal
          onClose={() => setSelectedFilePreview(null)}
          file={selectedFilePreview}
        />
      )}
      <Carousel
        infiniteLoop
        className="relative"
        renderArrowNext={(onClick) => {
          if (!hasMultipleFiles) return null;
          return (
            <CarouselArrow
              Icon={ArrowRightIcon}
              onClick={onClick}
              className="right-0"
            />
          );
        }}
        renderArrowPrev={(onClick) => {
          if (!hasMultipleFiles) return null;
          return (
            <CarouselArrow
              Icon={ArrowLeftIcon}
              onClick={onClick}
              className="left-0 z-10"
            />
          );
        }}
        showStatus={false}
        renderIndicator={(_, isActive) => {
          if (!hasMultipleFiles) return null;

          return <CarouselItemIndicator isActive={isActive} />;
        }}
        showThumbs={false}
      >
        {files.map((file) => {
          const { id, name, sizes, url } = file;
          return (
            <CarouselItem
              type="button"
              onClick={() => {
                setSelectedFilePreview(file);

                if (onItemClick) {
                  onItemClick(file);
                }
              }}
              key={id}
              className="shadow-card rounded-lg relative overflow-hidden w-full"
            >
              {isImage(file) ? (
                <>
                  <div className="absolute opacity-75 top-0 left-0 w-full h-full bg-grayscale-secondary" />
                  <img
                    className="rounded-lg max-h-full object-cover h-full"
                    alt={name}
                    {...selectDefinedImageSource({ srcSet: sizes, src: url })}
                  />
                </>
              ) : (
                <UncontrolledVideoPlayer
                  height={ITEM_HEIGHT}
                  controls={false}
                  className="max-h-full object-contain"
                  url={url}
                />
              )}
            </CarouselItem>
          );
        })}
      </Carousel>
    </>
  );
};

export default MediaCarousel;
