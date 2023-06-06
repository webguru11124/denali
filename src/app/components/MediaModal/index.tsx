/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from '@emotion/styled';
import { useDispatch } from 'app/hooks';
import { actions } from 'app/store/modal';
import { FC, useEffect } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import ArrowLeftIcon from 'remixicon-react/ArrowLeftSLineIcon';
import ArrowRightIcon from 'remixicon-react/ArrowRightSLineIcon';

import Video from './Video';

const isImage = (file: File) => file.type.includes('image');

interface File {
  type: string;
  name?: string;
  url: string;
}

interface MediaModalProps {
  onClose: () => void;
  file: File;
  totalFiles: number;
  currentFile: number;
  onNext: () => void;
  onPrev: () => void;
}

const ModalContainer = styled.div`
  background-color: rgba(34, 34, 34, 0.8);
`;

const ContentContainer = styled.div`
  width: 930px;
  height: 600px;
`;

const AmountTagContainer = styled.div`
  background-color: rgba(34, 34, 34, 0.4);
`;

const NextButton = styled.button`
  right: -28px;
`;

const PrevButton = styled.button`
  left: -28px;
`;

const MediaModal: FC<MediaModalProps> = ({
  onClose,
  file,
  totalFiles,
  currentFile,
  onNext,
  onPrev,
}) => {
  const dispatch = useDispatch();
  const shouldDisplayControls = totalFiles > 1;

  useEffect(() => {
    dispatch(actions.modalOpened());

    return () => {
      dispatch(actions.modalClosed());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalContainer className="fixed z-50 flex justify-center items-center top-0 left-0 w-screen h-screen">
      <OutsideClickHandler onOutsideClick={onClose}>
        <ContentContainer
          onClick={onClose}
          className="flex justify-center relative"
        >
          {shouldDisplayControls && (
            <>
              <AmountTagContainer className="text-white px-3 whitespace-nowrap transform -translate-x-1/2 left-1/2 py-1 text-sm rounded-full absolute top-0 mt-3 z-10">
                {currentFile} / {totalFiles}
              </AmountTagContainer>
              <PrevButton
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className="absolute text-white top-1/2"
              >
                {' '}
                <ArrowLeftIcon />
              </PrevButton>
            </>
          )}

          {isImage(file) ? (
            <div className="object-contain flex justify-center items-center">
              <img
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="rounded-xl max-w-full max-h-full"
                src={file.url}
                alt={file.name}
              />
            </div>
          ) : (
            <Video url={file.url} />
          )}
          {shouldDisplayControls && (
            <NextButton
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute text-white top-1/2"
            >
              <ArrowRightIcon />
            </NextButton>
          )}
        </ContentContainer>
      </OutsideClickHandler>
    </ModalContainer>
  );
};

export default MediaModal;
