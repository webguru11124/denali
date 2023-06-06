import createSrcSet from './createSrcSet';
import { ImageSources, SelectedImageSource } from './types';

const selectDefinedImageSource = ({
  srcSet,
  src,
}: ImageSources): SelectedImageSource => {
  if (srcSet || src) {
    return {
      src: src || undefined,
      srcSet: srcSet ? createSrcSet(srcSet) : undefined,
    };
  }

  return null;
};

export default selectDefinedImageSource;
