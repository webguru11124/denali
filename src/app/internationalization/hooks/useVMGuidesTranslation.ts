import { VMGuidesKey } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useVMGuidesTranslation = () => {
  const translation = useBaseTranslation<VMGuidesKey>(undefined, {
    keyPrefix: 'vmguides',
  });

  return translation;
};

export default useVMGuidesTranslation;
