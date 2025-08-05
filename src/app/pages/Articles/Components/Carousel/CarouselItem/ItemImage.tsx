import { cx } from '@emotion/css';
import { PageLoader } from 'app/components';
import { Gallery } from 'iconsax-react';
import { useState } from 'react';

interface ItemImageProps {
  url: string;
}

const ItemImage = ({ url }: ItemImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const ImageBottomTransparency = () => {
    return (
      <div className="bg-gradient-to-b from-transparent to-white h-8 w-full absolute bottom-0 right-0" />
    );
  };

  return (
    <div className="relative">
      {!hasLoaded && !hasError && (
        <div className="flex items-center justify-center aspect-[2.2/1]">
          <PageLoader />
        </div>
      )}
      {!hasError && (
        <>
          <img
            src={url}
            className={cx('w-full rounded-t-[24px] object-cover', {
              'h-0': !hasLoaded || hasError,
              'aspect-[2.2/1]': hasLoaded && !hasError,
            })}
            alt="cover"
            onLoad={() => {
              setHasLoaded(true);
              setHasError(false);
            }}
            onError={() => setHasError(true)}
          />
          <ImageBottomTransparency />
        </>
      )}

      {hasError && (
        <div className="flex items-center justify-center bg-hover-blue text-focus rounded-t-[24px] border-2 border-white shadow-block aspect-[2.2/1]">
          <Gallery size={40} />
        </div>
      )}
    </div>
  );
};

export default ItemImage;
