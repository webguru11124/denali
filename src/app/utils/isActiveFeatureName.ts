import { FeatureFlagKey } from 'app/config/types';

const isActiveFeatureName = (
  feature: FeatureFlagKey,
  features: ReadonlyArray<string>
) => features.includes(feature);

export default isActiveFeatureName;
