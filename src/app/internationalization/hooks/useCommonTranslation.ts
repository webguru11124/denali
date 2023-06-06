import { CommonKey } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useCommonTranslation = () => {
  const translation = useBaseTranslation<CommonKey>(undefined, {
    keyPrefix: 'common',
  });

  return translation;
};

export default useCommonTranslation;
