import { ChannelCoverImage } from 'app/api/channels/types';
import config from 'app/config';
import { useEffect, useState } from 'react';

const useImageSource = (image: ChannelCoverImage) => {
  const [hasError, setHasError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    if (!image) return;

    if (typeof image === 'string') return setImageSource(image);

    if (!image?.file && image?.url) {
      return setImageSource(`${config.env.channelsApiUrl}/${image.url}`);
    }

    if (image?.file) {
      const src = URL.createObjectURL(image.file);
      setImageSource(src);

      return () => URL.revokeObjectURL(src);
    }
  }, [image]);

  return {
    hasError,
    hasLoaded,
    imageSource,
    setHasLoaded,
    setHasError,
  };
};

export default useImageSource;
