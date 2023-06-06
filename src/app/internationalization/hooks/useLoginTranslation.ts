import { LoginKey } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useLoginTranslation = () => {
  const translation = useBaseTranslation<LoginKey>(undefined, {
    keyPrefix: 'login',
  });

  return translation;
};

export default useLoginTranslation;
