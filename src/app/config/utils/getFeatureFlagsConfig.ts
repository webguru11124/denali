import { FeatureFlags } from '../types';

const getFeatureFlagsConfig = async (): Promise<FeatureFlags> => {
  const featureFlags = await import(
    `../../../config/${import.meta.env.REACT_APP_ENVIRONMENT}.featureFlags.ts`
  );

  return featureFlags.default;
};

export default getFeatureFlagsConfig;
