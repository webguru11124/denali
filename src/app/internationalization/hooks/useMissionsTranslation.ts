import { MissionsKey } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useMissionsTranslation = () => {
  const translation = useBaseTranslation<MissionsKey>(undefined, {
    keyPrefix: 'missions',
  });

  return translation;
};

export default useMissionsTranslation;
