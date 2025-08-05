import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { ChannelCoverImage as TChannelCoverImage } from 'app/api/channels/types';
import config from 'app/config';
import { GalleryAdd, Danger } from 'iconsax-react';
import { FC } from 'react';

import useImageSource from '../hooks/useCoverImage';

const BlackLayer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="h-56 bg-grayscale-bg-dark border-gray-light border-[1px] rounded-lg flex flex-col justify-center items-center gap-2">
    {children}
  </div>
);

const ChannelCoverImage: FC<Props> = ({ image, isLoading }) => {
  const { hasError, hasLoaded, imageSource, setHasError, setHasLoaded } =
    useImageSource(image);

  if (isLoading)
    return (
      <Container>
        <GalleryAdd size={28} />
        <span>Uploading Cover Image</span>
      </Container>
    );

  if (hasError)
    return (
      <Container>
        <Danger size={28} color={config.colors.error} />
        <span>There was an error. Try again.</span>
      </Container>
    );

  if (!imageSource)
    return (
      <Container>
        <GalleryAdd size={28} />
        <span>Upload Cover Image</span>
      </Container>
    );

  return (
    <Container>
      <div className="relative h-full w-full">
        <img
          className={cx('rounded-lg object-cover h-56 w-full', {
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
        <BlackLayer className="flex flex-col gap-1 absolute h-56 w-full left-0 top-0 items-center justify-center text-white rounded-lg">
          <GalleryAdd size={28} />
          <span>Change Image</span>
        </BlackLayer>
      </div>
    </Container>
  );
};

interface Props {
  image: TChannelCoverImage;
  isLoading: boolean;
}

export default ChannelCoverImage;
