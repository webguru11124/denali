import { WikiKey } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useWikiTranslation = () => {
  const translation = useBaseTranslation<WikiKey>(undefined, {
    keyPrefix: 'wiki',
  });

  return translation;
};

export default useWikiTranslation;
