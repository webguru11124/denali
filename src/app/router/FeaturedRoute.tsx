import { Feature } from '@paralleldrive/react-feature-toggles';
import { FeatureFlagKey } from 'app/config/types';
import { memo } from 'react';
import { RouteProps, Route } from 'react-router-dom';

interface FeaturedRouteProps extends RouteProps {
  feature?: FeatureFlagKey;
}

const FeaturedRoute = ({ feature, ...restProps }: FeaturedRouteProps) => {
  const ConfiguredRoute = () => <Route {...restProps} />;

  if (feature) {
    return <Feature name={feature} activeComponent={ConfiguredRoute} />;
  }

  return <ConfiguredRoute />;
};

export default memo(FeaturedRoute);
