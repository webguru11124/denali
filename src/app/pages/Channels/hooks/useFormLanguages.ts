import { useISOLanguages } from 'app/hooks';
import { useState } from 'react';

import { ISOLanguage } from '../types';

const useFormLanguages = () => {
  const [search, setSearch] = useState('');
  const allLanguages: ISOLanguage[] = useISOLanguages({ search: '' });
  const languages: ISOLanguage[] = useISOLanguages({ search });

  return {
    allLanguages,
    languages,
    search,
    setSearch,
  };
};

export default useFormLanguages;
