import { CommonKey } from '../types';

import useBaseTranslation from './useBaseTranslation';
const useNotFoundTranslation = () => {
  const translation = useBaseTranslation<CommonKey>(undefined, {
    keyPrefix: 'notFound',
  });
  return translation;
};
export default useNotFoundTranslation;