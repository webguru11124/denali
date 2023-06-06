import { ErrorsKey } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useErrorTranslation = () => {
  const translation = useBaseTranslation<ErrorsKey>(undefined, {
    keyPrefix: 'errors',
  });

  return translation;
};

export default useErrorTranslation;
