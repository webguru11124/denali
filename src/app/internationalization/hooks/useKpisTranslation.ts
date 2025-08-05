import { KpisKey } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useKpisTranslation = () => {
  const translation = useBaseTranslation<KpisKey>(undefined, {
    keyPrefix: 'kpis',
  });

  return translation;
};

export default useKpisTranslation;
