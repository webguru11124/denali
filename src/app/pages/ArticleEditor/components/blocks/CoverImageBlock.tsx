import { useNode } from '@craftjs/core';
import { css, cx } from '@emotion/css';
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
import { Edit, Gallery, Refresh } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import {
  CoverImageArticleFileGet,
  CreatedFileSlot,
} from 'submodules/common-ui/generated/api/gcs/api';

import MediaBlockError from '../MediaBlockError';

interface CoverImageBlockProps {
  imageSchema?: CoverImageArticleFileGet;
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

const CoverImageBlock = ({ imageSchema }: CoverImageBlockProps) => {
  const { mode } = useParams<{ mode: string }>();
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImageFileSrc, setCoverImageFileSrc] = useState<string | null>(
    null
  );
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [editorImageSrc, setEditorImageSrc] = useState<string | null>(null);

  const canEdit = useSelector(editorSelectors.getCanEdit);

  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode();

  const { upload } = useFileUpload();

  const { t } = useArticlesTranslation();

  useEffect(() => {
    if (!imageSchema || coverImageFile) return;

    setCoverImageFileSrc(imageSchema.url);
  }, [imageSchema, coverImageFile]);

  useEffect(() => {
    if (!coverImageFile) return;

    const src = URL.createObjectURL(coverImageFile);

    setCoverImageFileSrc(src);

    return () => URL.revokeObjectURL(src);
  }, [coverImageFile]);

  const tenant = useSelector(selectors.getSelectedTenant);
  const fileId = imageSchema?.type === 'internal' ? imageSchema.id : '';
  const fileName = imageSchema?.name ?? '';

  const { refetch: getFileUrl } = useGetFile(
    tenant?.alias ?? '',
    fileId,
    fileName,
    'url'
  );

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setHasError(false);

    const image = e.target.files?.[0];

    //In case the user removes the image and tries to add the same image
    e.target.value = '';

    if (!image) return;

    upload(image, {
      onSuccess: (response) => onImageUpload(image, response),
      onError: logger.error,
    });
  };

  const onImageUpload = (image: File, response: CreatedFileSlot): void => {
    setCoverImageFile(image);
    setProp((props: CoverImageBlockProps) => {
      props.imageSchema = {
        name: image.name,
        type: 'internal',
        url: response.url,
        id: response.id,
      };
    });
  };

  const removeImage = () => {
    setCoverImageFile(null);
    setCoverImageFileSrc(null);
    setProp((props: CoverImageBlockProps) => {
      props.imageSchema = undefined;
    });
  };

  const onProcess = (img: File) => {
    setShowImageEditor(false);
    if (img) {
      setCoverImageFileSrc(URL.createObjectURL(img));
      upload(img, {
        onSuccess: (response) => onImageUpload(img, response),
        onError: logger.error,
      });
    }
  };

  const openImageEditor = async () => {
    if (coverImageFile) {
      setEditorImageSrc(coverImageFileSrc);
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

  const ImageBottomTransparency = () => {
    return (
      <div className="bg-gradient-to-b from-transparent to-white h-12 w-full absolute bottom-0 right-0" />
    );
  };

  const ImageOpacityOverlay = () => {
    return (
      <div className="absolute top-0 bottom-0 left-0 right-0 h-full w-full opacity-0 transition bg-grayscale-primary rounded-t-lg hover:opacity-50" />
    );
  };

  const enabled =
    canEdit && mode !== editorTypes.view && mode !== editorTypes.review;

  return (
    <div ref={(ref) => ref && connect(ref)}>
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
      <label
        htmlFor="coverImage"
        className="flex text-lg text-gray-dark hover:text-grayscale-secondary mb-4"
      >
        {coverImageFileSrc && !hasError && (
          <div
            className={cx(
              'w-full relative -mb-16',
              { hidden: !hasLoaded },
              css(`
              &:hover {
                #replace {
                  display: flex;
                }
                #editImg {
                  display: flex;
                }
              }
            `)
            )}
          >
            <img
              src={coverImageFileSrc}
              className="w-full rounded-t-lg object-cover aspect-[2.2/1]"
              alt="cover"
              onError={() => setHasError(true)}
              onLoad={() => {
                setHasLoaded(true);
                setHasError(false);
              }}
            />
            {mode === editorTypes.edit && canEdit && <ImageOpacityOverlay />}
            <ImageBottomTransparency />
            {mode === editorTypes.edit && canEdit && (
              <>
                <button
                  id="replace"
                  className="h-8 w-8 hidden justify-center items-center absolute -top-3 -right-3 rounded bg-white shadow-atobi text-focus"
                  onClick={removeImage}
                  data-tip={t('Replace')}
                  data-for="replace"
                >
                  <Refresh size={20} />
                  <ReactTooltip
                    place="top"
                    effect="solid"
                    class="react-tooltip"
                    id="replace"
                  />
                </button>
              </>
            )}
            {coverImageFileSrc && mode === editorTypes.edit && canEdit && (
              <button
                id="editImg"
                className="h-8 w-8 hidden justify-center items-center absolute -top-3 -left-3 rounded bg-white shadow-atobi text-focus"
                onClick={() => openImageEditor()}
                data-tip={t('Edit')}
                data-for="editImg"
              >
                <Edit size={20} className="text-grayscale-secondary" />
                <ReactTooltip
                  place="top"
                  effect="solid"
                  class="react-tooltip"
                  id="editImg"
                />
              </button>
            )}
          </div>
        )}
        {coverImageFileSrc && !hasLoaded && !hasError && <PageLoader />}

        {hasError && (
          <div className="w-full cursor-pointer relative -mb-16">
            <MediaBlockError isCover={true} fileId={fileId} />
            <ImageBottomTransparency />
          </div>
        )}
        {!coverImageFileSrc && !hasError && (
          <div className="flex items-center pl-5 pt-4">
            <Gallery />
            <span className="ml-1">
              {t('Add cover photo')}
              <span className="text-error">*</span>
            </span>
          </div>
        )}

        <input
          id="coverImage"
          className="hidden"
          type="file"
          onChange={onImageChange}
          disabled={!enabled}
        />
      </label>
      <ToastContainer toastId="Image" />
    </div>
  );
};

export { CoverImageBlock };
export default CoverImageBlock;
