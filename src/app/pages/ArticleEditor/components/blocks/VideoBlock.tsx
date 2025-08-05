import { useEditor, useNode } from '@craftjs/core';
import { cx } from '@emotion/css';
import { Spinner } from 'app/components';
import useFileUpload from 'app/hooks/useFileUpload';
import Toast from 'app/pages/Articles/Components/Toast/Toast';
import ToastContainer from 'app/pages/Articles/Components/Toast/ToastContainer';
import { editorTypes } from 'app/router/constants';
import { selectors } from 'app/store/editor';
import logger from 'app/utils/logger';
import { ExternalFile, InternalFileGet } from 'common-ui/generated/api/gcs';
import { Edit, VideoAdd } from 'iconsax-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

import MAX_FILE_SIZE from '../../constants';
import BaseBlockContainer from '../BaseBlockContainer';
import MediaBlockError from '../MediaBlockError';
import MediaBlockPlaceholder from '../MediaBlockPlaceholder';
import MediaBlockOptionSettings, {
  AddedFile,
  UploadedFile,
} from '../MediaBlockSettings/MediaBlockOptionSettings';
import { SettingsState } from '../MediaBlockSettings/types';

interface VideoBlockProps {
  videoSchema?: InternalFileGet | ExternalFile;
  file?: File;
  error?: string;
}

const showToast = (text: string) =>
  toast(<Toast text={text} onClick={toast.dismiss} />, {
    position: 'bottom-center',
    autoClose: 8000,
    closeButton: false,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    containerId: 'Video',
  });

const VideoBlock = ({ videoSchema, file }: VideoBlockProps) => {
  const { mode } = useParams<{ mode: string }>();
  const [videoFileSrc, setVideoFileSrc] = useState<string | ArrayBuffer | null>(
    null
  );
  const [hasError, setHasError] = useState(false);
  const [processingVideo, setProcessingVideo] = useState(false);
  const { t } = useTranslation();
  const { upload } = useFileUpload();
  const canEdit = useSelector(selectors.getCanEdit);
  const {
    connectors: { connect },
    selected,
    nodeId,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
    nodeId: node.id,
  }));

  const {
    actions: { selectNode },
  } = useEditor();

  const [showVideoEditor, setShowVideoEditor] = useState(false);

  const articleId = useSelector(selectors.getCurrentArticleId);
  const fileId = videoSchema?.type === 'internal' ? videoSchema.id : '';

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoSchema?.url && !file) {
      setHasError(false);
      setVideoFileSrc(videoSchema.url);
    }
  }, [videoSchema, file]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (): void => {
        setVideoFileSrc(reader.result);
      };

      setHasError(false);
    }
  }, [file]);

  const onVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const video = e?.target.files?.[0];
    if (!video) return logger.debug('MediaPicker onFileChange file is null');

    if (video.size > MAX_FILE_SIZE) {
      setProp((props: VideoBlockProps) => {
        props.file = undefined;
        props.videoSchema = undefined;
        props.error = `${t('Your file is too big. The limit is {{size}} MB', {
          size: 100,
        })}`;
      });
      return;
    }

    uploadVideo(video);
  };

  const uploadVideo = (video: File) => {
    upload(video, {
      onSuccess: (response) => {
        setProp((props: VideoBlockProps) => {
          props.error = '';
          props.file = video;
          props.videoSchema = {
            type: 'internal',
            id: response.id,
            url: '',
            name: video.name,
            translationStatus: 'draft',
          } as InternalFileGet;
        });
      },
      onError: logger.error,
    });
  };

  const triggerInputClick = () => {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  };

  const enabled =
    canEdit && mode !== editorTypes.view && mode !== editorTypes.review;

  useEffect(() => {
    if (videoFileSrc && !hasError) {
      videoPlayerRef?.current?.addEventListener('play', (event) => {
        selectNode(nodeId);
      });
      videoPlayerRef?.current?.addEventListener('pause', (event) => {
        selectNode(nodeId);
      });
    }
  }, [videoFileSrc, hasError, selectNode, nodeId]);

  return (
    <div ref={(ref) => ref && connect(ref)} className="mx-2">
      <BaseBlockContainer selected={selected} nodeId={nodeId} type={'Video'}>
        {!videoFileSrc && !hasError && (
          <MediaBlockPlaceholder
            type={t('Video')}
            TypeIcon={VideoAdd}
            onChange={onVideoChange}
          />
        )}
        {processingVideo && (
          <div className="absolute inset-0 bg-white opacity-80 z-10">
            <div className="flex items-center justify-center w-full h-full">
              <div>
                <Spinner />
                <div className="text-xs text-grayscale-secondary -mt-8">
                  {t('Processing...')}
                </div>
              </div>
            </div>
          </div>
        )}

        {videoFileSrc && !hasError && (
          /* To Comply with the rule below, we would need to create .vtt files with captions for the deaf https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API
           */
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            ref={videoPlayerRef}
            src={videoFileSrc as string}
            className="w-full rounded"
            controls={true}
            onError={() => setHasError(true)}
            onLoadedData={() => setHasError(false)}
          />
        )}

        {hasError && (
          <MediaBlockError onDoubleClick={triggerInputClick} fileId={fileId} />
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={onVideoChange}
          disabled={!enabled}
        />

        {/* Temporary hide Edit buton, while video processing is not working yet */}
        {videoFileSrc && !processingVideo && enabled && (
          <button
            className={cx(
              'py-2 px-4 rounded-2xl justify-center items-center absolute -top-3 -left-3 bg-white shadow-atobi text-focus hidden'
            )}
            onClick={() => setShowVideoEditor(true)}
            data-tip={t('Edit')}
            data-for="edit"
          >
            <Edit size={24} className="text-grayscale-secondary" />
            <ReactTooltip
              place="top"
              effect="solid"
              class="react-tooltip"
              id="edit"
            />
          </button>
        )}
      </BaseBlockContainer>
      <ToastContainer toastId="Video" />
    </div>
  );
};

const VideoSettings = () => {
  const {
    selectedProps,
    actions: { setProp },
  } = useNode((node) => {
    return {
      selectedProps: node.data.props,
    };
  });

  const { t } = useTranslation();

  const state: SettingsState = {
    id: selectedProps?.videoSchema?.id,
    url: selectedProps?.videoSchema?.url,
    name: selectedProps?.videoSchema?.name,
  };

  const getPropPayload = (
    data: string | UploadedFile | AddedFile
  ): {
    file: File | undefined;
    videoSchema: InternalFileGet | ExternalFile;
  } => {
    if (typeof data === 'string') {
      return {
        file: undefined,
        videoSchema: {
          type: 'external',
          name: '',
          url: data,
          translationStatus: 'draft',
        },
      };
    }

    if (data.type === 'uploaded') {
      return {
        file: data.data,
        videoSchema: {
          type: 'internal',
          id: data.id,
          url: '',
          name: data.data.name,
          translationStatus: 'draft',
        } as InternalFileGet,
      };
    }

    return {
      file: data.data,
      videoSchema: {
        type: 'internal',
        id: '',
        url: '',
        name: data.data.name,
        translationStatus: 'draft',
      } as InternalFileGet,
    };
  };

  return (
    <MediaBlockOptionSettings
      state={state}
      label={t('Upload your video')}
      inputLabel={t('Video')}
      onChange={(data) => {
        setProp((props: VideoBlockProps) => {
          if (typeof data !== 'string' && data.type === 'error') {
            props.file = undefined;
            props.videoSchema = undefined;
            props.error = data.error;
            return;
          } else {
            props.error = '';
          }
          const { file, videoSchema } = getPropPayload(data);
          props.file = file;
          props.videoSchema = videoSchema;
          return;
        });
      }}
    />
  );
};

VideoBlock.craft = {
  related: {
    settings: VideoSettings,
  },
};

export { VideoBlock };
export default VideoBlock;
