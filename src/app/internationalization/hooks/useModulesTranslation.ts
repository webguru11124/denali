import { ModulesKeys } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useModulesTranslation = () => {
  const translation = useBaseTranslation<ModulesKeys>(undefined, {
    keyPrefix: 'modules',
  });

  return translation;
};

export default useModulesTranslation;
