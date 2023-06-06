import colors from '../../config/colors.json';
import screenSizes from '../../config/screenSizes.json';
import { LogLevel } from '../utils/types';

export type LogLevelKeys = keyof typeof LogLevel;

export interface EnabledFeatureFlag {
  // String array of enabled tenant names
  enabled: Array<string>;
}
export interface DisabledFeatureFlag {
  // String array of disabed tenant names
  disabled: Array<string>;
}

export type AppEnvironment = 'dev' | 'test' | 'staging' | 'prod';

export type FeatureFlag = boolean | EnabledFeatureFlag | DisabledFeatureFlag;

export interface FeatureFlags {
  chat: FeatureFlag;
  kpiDashboard: FeatureFlag;
  missions: FeatureFlag;
  news: FeatureFlag;
  social: FeatureFlag;
  vmGuides: FeatureFlag;
  nikeSKU: FeatureFlag;
  videoChat: FeatureFlag;
  identityServer: FeatureFlag;
  atticus: FeatureFlag;
  channelsView: FeatureFlag;
  sisense: FeatureFlag;
  members: FeatureFlag;
}

export type FeatureFlagKey = keyof FeatureFlags;

export interface EnvConfig {
  tenantApiUrl: string;
  articlesApiUrl: string;
  channelsApiUrl: string;
  privacyPolicyUrl: string;
  sentryDns: string | undefined;
  sentryEnv: string;
  logLevel: LogLevelKeys;
  appEnv: AppEnvironment;
  chatUri: string;
  nikeSKUUri: string;
  nikeSkuApiUrlTemplate: string;
  nikeSkuEncryptionKey: string;
  identityServerUri: string;
  identityServerClientId: string;
  identityServerRedirectUri: string;
  identityServerScopes: string;
  atticusUrl: string;
  sisenseUrl: string;
  sisenseToken: string;
  giphyToken: string;
}

export interface Configuration {
  env: EnvConfig;
  screenSizes: typeof screenSizes;
  colors: typeof colors;
  featureFlags: Promise<FeatureFlags>;
}
