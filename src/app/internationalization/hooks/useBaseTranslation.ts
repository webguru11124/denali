import { useTranslation, UseTranslationOptions } from 'react-i18next';

import { ModuleKeys } from '../types';

const useBaseTranslation = <TKey extends string>(
  namespace?: string,
  options?: UseTranslationOptions<ModuleKeys>
) => {
  const { t, ...rest } = useTranslation(namespace, options);

  return {
    ...rest,
    t,
  };
};

export default useBaseTranslation;
