import { useState } from 'react';

import useControlledTranslations from './useControlledTranslations';

const useTranslations = (texts: Array<string>) => {
  const [isTranslated, setIsTranslated] = useState<boolean>(false);
  const data = useControlledTranslations({ texts, isTranslated });

  return {
    ...data,
    isTranslated,
    toggleTranslation: () => setIsTranslated((prevState) => !prevState),
  };
};

export default useTranslations;
