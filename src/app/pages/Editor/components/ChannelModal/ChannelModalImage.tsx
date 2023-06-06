import { cx } from '@emotion/css';
import { ChannelCoverImage as IChannelCoverImage } from 'app/api/channels/types';
import { PageLoader } from 'app/components';
import useImageSource from 'app/pages/Channels/hooks/useCoverImage';
import { Gallery } from 'iconsax-react';
import { FC } from 'react';
const ChannelModalImage: FC<Props> = ({ image }) => {
  const { hasError, hasLoaded, imageSource, setHasError, setHasLoaded } =
    useImageSource(image);
  return (
    <>
      {!hasLoaded && !hasError && (
        <div className="w-full h-full">
          <PageLoader />
        </div>
      )}
      {imageSource && (
        <img
          className={cx('object-cover h-full w-full', {
            hidden: (!hasLoaded && !hasError) || hasError,
          })}
          src={imageSource}
          alt={imageSource}
          onLoad={() => {
            setHasLoaded(true);
            setHasError(false);
          }}
          onError={() => setHasError(true)}
        />
      )}
      {(hasError || !imageSource) && (
        <div className="flex items-center justify-center bg-hover-blue text-focus">
          <Gallery size={24} />
        </div>
      )}
    </>
  );
};
interface Props {
  image: IChannelCoverImage;
  isLoading: boolean;
}
export default ChannelModalImage;
