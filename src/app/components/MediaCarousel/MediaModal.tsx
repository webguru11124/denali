import styled from '@emotion/styled';
import { ApiMediaFile } from 'app/api/types';
import { isImage, selectDefinedImageSource } from 'app/utils';
import { FC } from 'react';
import CloseIcon from 'remixicon-react/CloseLineIcon';

import IconButton from '../IconButton';
import Modal from '../Modal';
import UncontrolledVideoPlayer from '../UncontrolledVideoPlayer';

interface MediaModalProps {
  file: ApiMediaFile;
  onClose: () => void;
}

const Container = styled.div`
  width: 90vw;
  height: 80vh;
`;

const MediaModal: FC<MediaModalProps> = ({ file, onClose }) => {
  const { name, url, sizes } = file;
  return (
    <Modal onClose={onClose}>
      <Container className="relative flex items-center justify-center">
        <div className="absolute top-0 z-50 right-0 mt-3 mr-3">
          <IconButton onClick={onClose} Icon={CloseIcon} />
        </div>
        {isImage(file) ? (
          <img
            className="w-full h-full object-cover"
            alt={name}
            {...selectDefinedImageSource({ srcSet: sizes, src: url })}
          />
        ) : (
          <UncontrolledVideoPlayer height="auto" width="auto" url={url} />
        )}
      </Container>
    </Modal>
  );
};

export default MediaModal;
