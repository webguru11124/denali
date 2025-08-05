import { Feature as FeatureLib } from '@paralleldrive/react-feature-toggles';
import { FeatureFlagKey } from 'app/config/types';

interface FeatureProps {
  feature: FeatureFlagKey;
  activeComponent: () => JSX.Element;
}

const Feature = ({ feature, activeComponent }: FeatureProps) => (
  <FeatureLib name={feature} activeComponent={activeComponent} />
);

export default Feature;
