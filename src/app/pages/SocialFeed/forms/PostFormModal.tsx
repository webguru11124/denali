import styled from '@emotion/styled';
import { Modal, IconButton, Button, ResizeableTextarea } from 'app/components';
import { useSocialFeedTranslation } from 'app/internationalization/hooks';
import { FC, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import CloseIcon from 'remixicon-react/CloseLineIcon';
import FileIcon from 'remixicon-react/File2LineIcon';
import ImageIcon from 'remixicon-react/Image2LineIcon';
import YoutubeIcon from 'remixicon-react/YoutubeLineIcon';

import AddFileButton from './AddFileButton';
import {
  UploadFunction,
  DeleteFunction,
  FileWithMetadata,
  ImperativeFileButtonHandlerProps,
} from './types';
import UploadedFile from './UploadedFile';
import UploadedImage from './UploadedImage';
import UploadedVideo from './UploadedVideo';

interface PostFormModalProps {
  onClose: () => void;
  label: string;
  userName: string;
  contentValue: string;
  images: Array<FileWithMetadata>;
  videos: Array<FileWithMetadata>;
  files: Array<FileWithMetadata>;
  onContentChange: (value: string) => void;
  onFilesUpload: UploadFunction;
  onVideosUpload: UploadFunction;
  onImagesUpload: UploadFunction;
  onImageDelete: DeleteFunction;
  onVideoDelete: DeleteFunction;
  onFileDelete: DeleteFunction;
  isSubmittable: boolean;
  isSubmitting: boolean;
}

const ModalContent = styled.div`
  width: 450px;
`;

const SCROLLBARS_STYLE = {
  width: '100%',
};

const PostFormModal: FC<PostFormModalProps> = ({
  onClose,
  userName,
  contentValue,
  onContentChange,
  isSubmittable,
  onFilesUpload,
  onImagesUpload,
  onVideosUpload,
  onImageDelete,
  onVideoDelete,
  onFileDelete,
  images,
  videos,
  files,
  isSubmitting,
  label,
}) => {
  const { t } = useSocialFeedTranslation();
  const imageButtonHandler = useRef<ImperativeFileButtonHandlerProps>(null);
  const videoButtonHandler = useRef<ImperativeFileButtonHandlerProps>(null);
  const fileButtonHandler = useRef<ImperativeFileButtonHandlerProps>(null);
  return (
    <Modal
      heading={
        <div className="flex justify-center w-full relative text-lg">
          {label}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <IconButton onClick={onClose} Icon={CloseIcon} />
          </div>
        </div>
      }
      onClose={onClose}
    >
      <ModalContent>
        <Scrollbars
          autoHeightMax={500}
          autoHide
          autoHeight
          style={SCROLLBARS_STYLE}
        >
          <ResizeableTextarea
            defaultHeight={80}
            onChange={(e) => onContentChange(e.target.value)}
            className="w-full h-auto overflow-auto resize-none focus:outline-none text-grayscale-secondary"
            placeholder={`${t('What’s on your mind, {{name}}?', {
              name: userName,
            })}`}
            value={contentValue}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          <div className="flex-col items-end mt-auto pb-2">
            {images.map(({ src, id, ...rest }) => (
              <UploadedImage
                className="first:rounded-t-lg last:rounded-b-lg mb-1"
                key={id}
                onAddMoreClick={() => {
                  if (imageButtonHandler.current) {
                    imageButtonHandler.current.click();
                  }
                }}
                url={src}
                onDeleteClick={() =>
                  onImageDelete({
                    id,
                    src,
                    ...rest,
                  })
                }
              />
            ))}

            {videos.map(({ src, id, ...rest }) => (
              <UploadedVideo
                className="first:rounded-t-lg last:rounded-b-lg mb-1"
                key={id}
                url={src}
                onAddMoreClick={() => {
                  if (videoButtonHandler.current) {
                    videoButtonHandler.current.click();
                  }
                }}
                onDeleteClick={() =>
                  onVideoDelete({
                    id,
                    src,
                    ...rest,
                  })
                }
              />
            ))}
          </div>
          <div>
            {files.map(({ src, id, file, ...rest }) => (
              <UploadedFile
                key={id}
                url={src}
                file={file}
                onDeleteClick={() =>
                  onFileDelete({
                    id,
                    src,
                    file,
                    ...rest,
                  })
                }
                onAddMoreClick={() => {
                  if (fileButtonHandler.current) {
                    fileButtonHandler.current.click();
                  }
                }}
              />
            ))}
          </div>
        </Scrollbars>

        <div className="flex top-10 mt-2">
          <AddFileButton
            Icon={ImageIcon}
            ref={imageButtonHandler}
            label={t('Image')}
            className="text-success mr-2"
            acceptTypes="image/*"
            onFileUpload={onImagesUpload}
          />
          <AddFileButton
            Icon={YoutubeIcon}
            label={t('Video')}
            ref={videoButtonHandler}
            acceptTypes="video/*"
            className="text-orange mr-2"
            onFileUpload={onVideosUpload}
          />
          <AddFileButton
            Icon={FileIcon}
            label={t('File')}
            className="text-focus"
            onFileUpload={onFilesUpload}
          />
        </div>
        <Button
          disabled={!isSubmittable || isSubmitting}
          className="mt-2"
          type="submit"
          variant="primary"
        >
          {t('Post')}
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default PostFormModal;
