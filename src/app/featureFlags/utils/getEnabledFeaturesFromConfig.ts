import config from 'app/config';
import { FeatureFlags, FeatureFlagKey } from 'app/config/types';

interface Options {
  currentTenant?: string;
  featureFlags: FeatureFlags;
}

type GetEnabledFeaturesFromConfig = (options: Options) => Array<FeatureFlagKey>;

const isFeatureFlagKey = (
  key: string,
  featureFlags: FeatureFlags
): key is FeatureFlagKey =>
  Object.prototype.hasOwnProperty.call(featureFlags, key);

const getEnabledFeaturesFromConfig: GetEnabledFeaturesFromConfig = ({
  currentTenant,
  featureFlags,
}) => {
  const keys = Object.entries(featureFlags)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, flagConfig]) => {
      if (typeof flagConfig === 'boolean') {
        return flagConfig;
      }
      if (flagConfig.enabled !== undefined) {
        return flagConfig.enabled.includes(currentTenant);
      }
      if (flagConfig.disabled !== undefined) {
        return !flagConfig.disabled.includes(currentTenant);
      }
    })
    .map<FeatureFlagKey>(([key]) => {
      if (!isFeatureFlagKey(key, featureFlags)) {
        throw new Error(
          `[getEnabledFeaturesFromConfig]: unknown feature key: ${key}`
        );
      }

      return key;
    });

  return keys;
};

export default getEnabledFeaturesFromConfig;
