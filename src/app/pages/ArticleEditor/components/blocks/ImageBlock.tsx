import { useEditor, useNode } from '@craftjs/core';
import { cx } from '@emotion/css';
import { PageLoader } from 'app/components';
import useFileUpload from 'app/hooks/useFileUpload';
import useGetFile from 'app/hooks/useGetFile';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import Toast from 'app/pages/Articles/Components/Toast/Toast';
import ToastContainer from 'app/pages/Articles/Components/Toast/ToastContainer';
import ImageEditor from 'app/pages/Editor/components/Pintura/ImageEditor';
import { editorTypes } from 'app/router/constants';
import { selectors } from 'app/store/auth';
import { selectors as editorSelectors } from 'app/store/editor';
import { logger } from 'app/utils';
import { Edit, GalleryAdd } from 'iconsax-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import {
  ExternalFile,
  InternalFileGet,
} from 'submodules/common-ui/generated/api/gcs/api';

import MAX_FILE_SIZE from '../../constants';
import BaseBlockContainer from '../BaseBlockContainer';
import MediaBlockError from '../MediaBlockError';
import MediaBlockPlaceholder from '../MediaBlockPlaceholder';
import MediaBlockOptionSettings, {
  UploadedFile,
  AddedFile,
} from '../MediaBlockSettings/MediaBlockOptionSettings';
import { SettingsState } from '../MediaBlockSettings/types';

interface ImageBlockProps {
  imageSchema?: InternalFileGet | ExternalFile;
  file?: File | string;
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
    containerId: 'Image',
  });

const ImageBlock = ({ imageSchema, file }: ImageBlockProps) => {
  const { mode } = useParams<{ mode: string }>();
  const [imageFileSrc, setImageFileSrc] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [editorImageSrc, setEditorImageSrc] = useState<string | null>(null);
  const canEdit = useSelector(editorSelectors.getCanEdit);
  const { upload } = useFileUpload();
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

  const { t } = useArticlesTranslation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) return;

    if (typeof file === 'string') {
      setImageFileSrc(file);
      return;
    }

    const src = URL.createObjectURL(file);

    setImageFileSrc(src);

    setHasError(false);

    return () => URL.revokeObjectURL(src);
  }, [file]);

  useEffect(() => {
    if (imageSchema?.url && !file) {
      setHasError(false);
      setImageFileSrc(imageSchema.url);
    }
  }, [imageSchema, file]);

  const tenant = useSelector(selectors.getSelectedTenant);
  const fileId = imageSchema?.type === 'internal' ? imageSchema.id : '';
  const fileName = imageSchema?.name ?? '';

  const { refetch: getFileUrl } = useGetFile(
    tenant?.alias ?? '',
    fileId,
    fileName,
    'url'
  );

  const onProcess = (img: File) => {
    selectNode(undefined);
    setShowImageEditor(false);
    if (img) {
      setImageFileSrc(URL.createObjectURL(img));
      uploadImage(img);
    }
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e?.target.files?.[0];
    if (!image) return logger.debug('MediaPicker onFileChange file is null');

    if (image.size > MAX_FILE_SIZE) {
      setProp((props: ImageBlockProps) => {
        props.file = undefined;
        props.imageSchema = undefined;
        props.error = `${t('Your file is too big. The limit is {{size}} MB', {
          size: 100,
        })}`;
      });
      return;
    }

    uploadImage(image);
  };

  const uploadImage = (image: File) => {
    upload(image, {
      onSuccess: (response) => {
        setProp((props: ImageBlockProps) => {
          props.error = '';
          props.file = image;
          props.imageSchema = {
            type: 'internal',
            id: response.id,
            url: '',
            name: image.name,
            translationStatus: 'draft',
          } as InternalFileGet;
        });
      },
      onError: logger.error,
    });
  };

  const openImageEditor = async () => {
    if (file) {
      setEditorImageSrc(imageFileSrc);
      setShowImageEditor(true);
      return;
    }

    const res = await getFileUrl();

    if (!res.isSuccess || res?.data?.url === undefined) {
      showToast(t('Error. Failed to load file'));
      return;
    }

    setEditorImageSrc(res?.data?.url);
    setShowImageEditor(true);
  };

  const triggerInputClick = () => {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  };

  const enabled =
    canEdit && mode !== editorTypes.view && mode !== editorTypes.review;

  return (
    <div ref={(ref) => ref && connect(ref)} className="mx-2">
      {showImageEditor && editorImageSrc && (
        <ImageEditor
          image={editorImageSrc}
          onProcess={onProcess}
          onClose={() => setShowImageEditor(false)}
          onError={(err) => {
            showToast(err.error.message);
            setShowImageEditor(false);
          }}
        />
      )}
      <BaseBlockContainer
        selected={selected}
        nodeId={nodeId}
        hasError={hasError}
        type={'Image'}
      >
        {!imageFileSrc && !hasError && (
          <MediaBlockPlaceholder
            type="Image"
            TypeIcon={GalleryAdd}
            onChange={onImageChange}
          />
        )}

        {imageFileSrc && !hasLoaded && !hasError && <PageLoader />}

        {imageFileSrc && !hasError && (
          <img
            onDoubleClick={() => triggerInputClick()}
            src={imageFileSrc}
            className="w-full rounded"
            alt={imageSchema?.name ?? 'img'}
            onError={() => setHasError(true)}
            onLoad={() => {
              setHasLoaded(true);
              setHasError(false);
            }}
          />
        )}

        {hasError && (
          <MediaBlockError onDoubleClick={triggerInputClick} fileId={fileId} />
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={onImageChange}
          disabled={!enabled}
        />

        {imageFileSrc &&
          !hasError &&
          mode !== editorTypes.view &&
          mode !== editorTypes.review && (
            <button
              id="editImg"
              className={cx(
                'py-2 px-4 rounded-2xl justify-center items-center absolute -top-3 -left-3 bg-white shadow-atobi text-focus',
                selected ? 'flex' : 'hidden'
              )}
              onClick={() => openImageEditor()}
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
      <ToastContainer toastId="Image" />
    </div>
  );
};

const ImageSettings = () => {
  const { t } = useTranslation();
  const {
    selectedProps,
    actions: { setProp },
  } = useNode((node) => {
    return {
      selectedProps: node.data.props,
    };
  });

  const state: SettingsState = {
    id: selectedProps?.imageSchema?.id,
    url: selectedProps?.imageSchema?.url,
    name: selectedProps?.imageSchema?.name,
  };

  const getPropPayload = (
    data: string | UploadedFile | AddedFile
  ): {
    file: File | undefined;
    imageSchema: InternalFileGet | ExternalFile;
  } => {
    if (typeof data === 'string') {
      return {
        file: undefined,
        imageSchema: {
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
        imageSchema: {
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
      imageSchema: {
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
      label={t('Upload your image')}
      inputLabel={t('Image')}
      onChange={(data) => {
        if (typeof data !== 'string' && data.type !== 'error') {
          const reader = new FileReader();
          reader.readAsDataURL(data.data);
          reader.onload = function () {
            setProp((props: ImageBlockProps) => {
              props.error = '';
              const { imageSchema } = getPropPayload(data);
              props.file = reader.result as string;
              props.imageSchema = imageSchema;
            });
          };
        }
        if (typeof data !== 'string' && data.type === 'error') {
          setProp((props: ImageBlockProps) => {
            props.file = undefined;
            props.imageSchema = undefined;
            props.error = data.error;
          });
        }
      }}
    />
  );
};

ImageBlock.craft = {
  related: {
    settings: ImageSettings,
  },
};

export { ImageBlock };
export default ImageBlock;
