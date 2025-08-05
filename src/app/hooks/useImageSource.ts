import config from 'app/config';
import { useEffect, useState } from 'react';

const useImageSource = (source: string) => {
  const [hasError, setHasError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    return setImageSource(`${config.env.channelsApiUrl}/${source}`);
  }, [source]);

  return {
    hasError,
    hasLoaded,
    imageSource,
    setHasLoaded,
    setHasError,
  };
};

export default useImageSource;
