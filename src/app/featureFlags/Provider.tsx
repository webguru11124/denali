import { FeatureToggles } from '@paralleldrive/react-feature-toggles';
import config from 'app/config';
import { useSelector } from 'app/hooks';
import { selectors } from 'app/store/auth';
import { ReactNode, useEffect, useState } from 'react';

import { getEnabledFeaturesFromConfig } from './utils';

interface Props {
  children: ReactNode;
}

const Provider = ({ children }: Props) => {
  const [enabledFeatures, setEnabledFeatures] = useState<Array<string>>([]);
  const selectedTenant = useSelector(selectors.getSelectedTenant);

  useEffect(() => {
    const getFeatureFlagsAndEnable = async () => {
      const featureFlags = await config.featureFlags;
      setEnabledFeatures(
        getEnabledFeaturesFromConfig({
          featureFlags: featureFlags,
          currentTenant: selectedTenant?.alias,
        })
      );
    };
    getFeatureFlagsAndEnable().catch();
  }, [selectedTenant]);

  return (
    <FeatureToggles features={enabledFeatures}>
      <>{children}</>
    </FeatureToggles>
  );
};

export default Provider;
