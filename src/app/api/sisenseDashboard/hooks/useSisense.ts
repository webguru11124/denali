import { useFeatures } from '@paralleldrive/react-feature-toggles';
import { useEffect, useState } from 'react';

import useGetSisenseListQuery from './useGetSisenseListQuery';

const useSisense = () => {
  const [enabled, setEnabled] = useState(false);
  const features = useFeatures();


  useEffect(() => {
    if (!features.includes('sisense')) return;
    setEnabled(true);
  }, [features]);

  const { sisenseList, isLoading } = useGetSisenseListQuery({
    enabled
  });

  return {
    sisenseList, isLoading
  };
};

export default useSisense;
