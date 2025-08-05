import { ComponentsKey } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useComponentsTranslation = () => {
  const translation = useBaseTranslation<ComponentsKey>(undefined, {
    keyPrefix: 'components',
  });

  return translation;
};

export default useComponentsTranslation;
