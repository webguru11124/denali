import { AudiencesKey } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useAudiencesTranslation = () => {
  const translation = useBaseTranslation<AudiencesKey>(undefined, {
    keyPrefix: 'audiences',
  });

  return translation;
};

export default useAudiencesTranslation;
