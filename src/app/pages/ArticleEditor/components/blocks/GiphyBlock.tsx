import { useNode } from '@craftjs/core';
import { IGif } from '@giphy/js-types';
import { PageLoader } from 'app/components';
import ToastContainer from 'app/pages/Articles/Components/Toast/ToastContainer';
import { GalleryAdd } from 'iconsax-react';
import noop from 'lodash/noop';
import { useEffect, useState } from 'react';
import { ExternalFile } from 'submodules/common-ui/generated/api/gcs/api';

import BaseBlockContainer from '../BaseBlockContainer';
import GiphyBlockSettings from '../GiphyBlockSettings';
import MediaBlockError from '../MediaBlockError';
import MediaBlockPlaceholder from '../MediaBlockPlaceholder';

interface GiphyBlockProps {
  imageSchema?: ExternalFile;
  error?: string;
}

const GiphyBlock = ({ imageSchema }: GiphyBlockProps) => {
  const [imageFileSrc, setImageFileSrc] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const {
    connectors: { connect },
    selected,
    nodeId,
  } = useNode((node) => ({
    selected: node.events.selected,
    nodeId: node.id,
  }));

  useEffect(() => {
    if (imageSchema?.url) {
      setHasError(false);
      setImageFileSrc(imageSchema.url);
    }
  }, [imageSchema]);

  return (
    <div ref={(ref) => ref && connect(ref)} className="mx-2">
      <BaseBlockContainer
        selected={selected}
        nodeId={nodeId}
        hasError={hasError}
        type={'GIF'}
      >
        {!imageFileSrc && !hasError && (
          <MediaBlockPlaceholder
            type="Gif"
            TypeIcon={GalleryAdd}
            onChange={undefined}
          />
        )}

        {imageFileSrc && !hasLoaded && !hasError && <PageLoader />}

        {imageFileSrc && !hasError && (
          <img
            src={imageSchema?.url ?? ''}
            className="w-full rounded"
            alt={imageSchema?.name ?? 'img'}
            onError={() => {
              setHasError(true);
            }}
            onLoad={() => {
              setHasLoaded(true);
              setHasError(false);
            }}
          />
        )}

        {hasError && <MediaBlockError onDoubleClick={noop} fileId={''} />}
      </BaseBlockContainer>
      <ToastContainer toastId="Image" />
    </div>
  );
};

const GiphySettings = () => {
  const {
    actions: { setProp },
  } = useNode((node) => {
    return {
      selectedProps: node.data.props,
    };
  });

  const onGifClick = (gif: IGif) => {
    setProp((props: GiphyBlockProps) => {
      props.error = '';
      props.imageSchema = {
        type: 'external',
        name: '',
        url: gif.images.original.url,
        translationStatus: 'draft',
      };
    });
  };

  return <GiphyBlockSettings onGifClick={onGifClick} />;
};

GiphyBlock.craft = {
  related: {
    settings: GiphySettings,
  },
};

export { GiphyBlock };
export default GiphyBlock;
