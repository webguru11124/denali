import styled from '@emotion/styled';
import { ApiMediaFile } from 'app/api/types';
import { Container, VideoPlayer } from 'app/components';
import { useDispatch } from 'app/hooks';
import { actions } from 'app/store/modal';
import { isImage, selectDefinedImageSource } from 'app/utils';
import { FC, useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import ArrowLeftIcon from 'remixicon-react/ArrowLeftSLineIcon';
import ArrowRightIcon from 'remixicon-react/ArrowRightSLineIcon';

interface GalleryModalProps {
  onClose: () => void;
  file: ApiMediaFile;
  totalFiles: number;
  currentFileIndex: number;
  onFileInspected?: (id: number) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
}

const ModalContainer = styled.div`
  background-color: rgba(34, 34, 34, 0.7);
  padding-top: 5vh;
`;

const ModalContent = styled.div`
  max-height: 90vh;
`;

const Image = styled.img`
  max-height: 90vh;
`;

const GalleryModal: FC<GalleryModalProps> = ({
  onClose,
  file,
  totalFiles,
  currentFileIndex,
  onNextClick,
  onPrevClick,
  onFileInspected,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.modalOpened());

    return () => {
      dispatch(actions.modalClosed());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isPlaying) {
      setIsPlaying(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    if (!onFileInspected) return undefined;
    if (isImage(file)) {
      onFileInspected(file.id);
    }

    return undefined;
  }, [file, onFileInspected]);

  return (
    <ModalContainer className="fixed z-50 top-0 left-0 w-screen h-screen pr-4">
      <div className="flex items-center justify-center">
        <OutsideClickHandler onOutsideClick={onClose}>
          <ModalContent className="relative">
            <Container className="max-h-full">
              <div className="w-full h-full">
                {isImage(file) ? (
                  <Image
                    className="mx-auto max-h-full object-contain rounded-lg"
                    alt={file.name}
                    {...selectDefinedImageSource({
                      src: file.url,
                      srcSet: file.sizes,
                    })}
                  />
                ) : (
                  <div className="overflow-hidden rounded-lg">
                    <VideoPlayer
                      url={file.url}
                      onEnded={() => {
                        if (onFileInspected) {
                          onFileInspected(file.id);
                        }
                      }}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      playing={isPlaying}
                    />
                  </div>
                )}
              </div>
            </Container>
            <div className="absolute bottom-0 mb-8 flex items-center justify-center text-white mx-auto inset-x-0 w-10">
              <button
                onClick={onPrevClick}
                disabled={currentFileIndex === 1}
                type="button"
                className="mr-6 disabled:opacity-50"
              >
                <ArrowLeftIcon className="w-8 h-8" />
              </button>
              <span className="text-base">
                {currentFileIndex}/{totalFiles}
              </span>
              <button
                onClick={onNextClick}
                disabled={currentFileIndex === totalFiles}
                type="button"
                className="ml-6 disabled:opacity-50"
              >
                <ArrowRightIcon className="w-8 h-8" />
              </button>
            </div>
          </ModalContent>
        </OutsideClickHandler>
      </div>
    </ModalContainer>
  );
};

export default GalleryModal;
