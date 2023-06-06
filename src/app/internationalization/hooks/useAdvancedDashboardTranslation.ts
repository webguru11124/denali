import { AdvancedDashboardKey } from '../types';

import useBaseTranslation from './useBaseTranslation';

const useAdvancedDashboardTranslation = () => {
  const translation = useBaseTranslation<AdvancedDashboardKey>(undefined, {
    keyPrefix: 'advancedDashboard',
  });

  return translation;
};

export default useAdvancedDashboardTranslation;
