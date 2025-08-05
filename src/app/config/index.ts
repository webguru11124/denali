import colors from '../../config/colors.json';
import screenSizes from '../../config/screenSizes.json';

import env from './env';
import { Configuration } from './types';
import { getFeatureFlagsConfig } from './utils';

const config: Configuration = {
  env,
  screenSizes,
  colors,
  featureFlags: getFeatureFlagsConfig(),
};

export default config;
