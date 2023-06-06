import { NewsKey } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useNewsTranslation = () => {
  const translation = useBaseTranslation<NewsKey>(undefined, {
    keyPrefix: 'news',
  });

  return translation;
};

export default useNewsTranslation;
