import { ArticlesKey } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useArticlesTranslation = () => {
  const translation = useBaseTranslation<ArticlesKey>(undefined, {
    keyPrefix: 'articles',
  });

  return translation;
};

export default useArticlesTranslation;
