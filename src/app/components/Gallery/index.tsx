import { cx, css } from '@emotion/css';
import { ApiFile } from 'app/api/types';
import { FileButton } from 'app/components';
import Null from 'app/components/Null';
import { useScreenBreakpoint } from 'app/hooks';
import {
  isImage,
  groupApiFilesByType,
  isVideo,
  selectDefinedImageSource,
  isDefined,
} from 'app/utils';
import { FC, useMemo, useState } from 'react';

import GalleryModal from './GalleryModal';
import GalleryVideo from './GalleryVideo';

interface GalleryProps {
  files: Array<ApiFile>;
  inspectedFilesIds?: Array<number>;
  onFileInspected?: (id: number) => void;
  displayInspectedIndicator?: boolean;
}

const getImageContainerClassName = (imagesAmount: number) => {
  if (imagesAmount === 1) {
    return cx(
      'col-12',
      css`
        max-height: 450px;
      `
    );
  }

  if (imagesAmount === 2) {
    return cx(
      'col-6',
      css`
        max-height: 450px;
      `
    );
  }

  return cx(
    'col-4',
    css`
      height: 210px;
    `
  );
};

const Gallery: FC<GalleryProps> = ({
  files: allFiles,
  inspectedFilesIds,
  onFileInspected,
  displayInspectedIndicator,
}) => {
  const breakpoint = useScreenBreakpoint();
  const [selectedModalFile, setSelectedModalFile] = useState<
    number | undefined
  >();

  const { files, images, videos, media } = useMemo(() => {
    const { files: groupedFiles, media: groupedMedia } =
      groupApiFilesByType(allFiles);
    const filteredVideos = groupedMedia.filter((file) => isVideo(file));
    const filteredImages = groupedMedia.filter((file) => isImage(file));
    return {
      files: groupedFiles,
      media: [...filteredImages, ...filteredVideos],
      videos: filteredVideos,
      images: filteredImages,
    };
  }, [allFiles]);

  const imageContainerClassName = getImageContainerClassName(images.length);

  const handleMediaClick = (id: number) => {
    const selectedFileIndex = media.findIndex(
      ({ id: fileId }) => fileId === id
    );
    if (selectedFileIndex !== -1) {
      setSelectedModalFile(selectedFileIndex);
    }
  };

  return (
    <div>
      {isDefined(selectedModalFile) && (
        <GalleryModal
          onFileInspected={(id: number) => {
            if (onFileInspected) {
              onFileInspected(id);
            }
          }}
          file={media[selectedModalFile]}
          onPrevClick={() => {
            setSelectedModalFile((prevValue) => {
              if (!isDefined(prevValue)) return undefined;
              if (prevValue > 0) {
                return prevValue - 1;
              }
              return prevValue;
            });
          }}
          onNextClick={() => {
            setSelectedModalFile((prevValue) => {
              if (!isDefined(prevValue)) return undefined;
              if (prevValue < media.length) {
                return prevValue + 1;
              }
              return prevValue;
            });
          }}
          totalFiles={media.length}
          currentFileIndex={selectedModalFile + 1}
          onClose={() => setSelectedModalFile(undefined)}
        />
      )}
      <div className="row">
        {files.map(({ fileName, type, url, id }) => (
          <div key={id} className="col-6 mb-6">
            <FileButton
              onDownloadSuccess={() => {
                if (onFileInspected) {
                  onFileInspected(id);
                }
              }}
              nameWidth={breakpoint === '2xl' ? 250 : 150}
              className="w-full"
              name={fileName}
              type={type}
              url={url}
            />
          </div>
        ))}
      </div>
      <div className="row">
        {images.map(({ id, name, sizes, url }) => (
          <div className={cx('mb-3', imageContainerClassName)} key={id}>
            <button
              onClick={() => handleMediaClick(id)}
              type="button"
              className="w-full h-full"
            >
              <img
                className="w-full h-full object-cover rounded-lg"
                {...selectDefinedImageSource({
                  src: url,
                  srcSet: sizes,
                })}
                alt={name}
              />
            </button>
          </div>
        ))}
      </div>
      <div className="row">
        {videos.map(({ id, url }) => (
          <div className="col-12 mb-3 relative" key={id}>
            <button
              className="w-full absolute inset-0 z-30"
              onClick={() => handleMediaClick(id)}
              type="button"
            >
              <Null />
            </button>
            <GalleryVideo
              url={url}
              displayInspectedIndicator={displayInspectedIndicator}
              isSeen={inspectedFilesIds?.includes(id)}
              onVideoViewed={() => {
                if (onFileInspected) {
                  onFileInspected(id);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
