import { ProfileKeys } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useProfileTranslation = () => {
  const translation = useBaseTranslation<ProfileKeys>(undefined, {
    keyPrefix: 'profile',
  });

  return translation;
};

export default useProfileTranslation;
