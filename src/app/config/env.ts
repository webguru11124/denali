/* eslint-disable no-console */

import { EnvConfig } from './types';
import { isLogLevelKey, isValidEnvironment } from './utils';

const tenantApiUrl = import.meta.env.REACT_APP_TENANT_API_URL;
const articlesApiUrl = import.meta.env.REACT_APP_ARTICLES_API_URL;
const channelsApiUrl = import.meta.env.REACT_APP_CHANNELS_API_URL;
const privacyPolicyUrl = import.meta.env.REACT_APP_PRIVACY_POLICY_URL;
const sentryDns = import.meta.env.REACT_APP_SENTRY_DNS;
const sentryEnv = import.meta.env.REACT_APP_SENTRY_ENVIRONMENT;
const chatUri = import.meta.env.REACT_APP_CHAT_URI;
const logLevel = import.meta.env.REACT_APP_LOG_LEVEL;
const nikeSKUUri = import.meta.env.REACT_APP_NIKE_SKU_URI;
const nikeSkuApiUrlTemplate = import.meta.env
  .REACT_APP_NIKE_SKU_API_URL_TEMPLATE;
const appEnv = import.meta.env.REACT_APP_ENVIRONMENT;
const nikeSkuEncryptionKey = import.meta.env.REACT_APP_NIKE_SKU_ENCRYPTION_KEY;
const identityServerUri = import.meta.env.REACT_APP_IDENTITY_SERVER_URI;
const identityServerClientId = import.meta.env
  .REACT_APP_IDENTITY_SERVER_CLIENT_ID;
const identityServerRedirectUri = import.meta.env
  .REACT_APP_IDENTITY_SERVER_REDIRECT_URI;
const identityServerScopes = import.meta.env.REACT_APP_IDENTITY_SERVER_SCOPES;
const atticusUrl = import.meta.env.REACT_APP_ATTICUS_URL;
const sisenseUrl = import.meta.env.REACT_APP_SISENSE_URL;
const sisenseToken = import.meta.env.REACT_APP_SISENSE_TOKEN;
const giphyToken = import.meta.env.REACT_APP_GIPHY_TOKEN;

if (!tenantApiUrl) throw new Error('REACT_APP_TENANT_API_URL is not set');
if (!articlesApiUrl) throw new Error('REACT_APP_ARTICLES_API_URL is not set');
if (!channelsApiUrl) throw new Error('REACT_APP_CHANNELS_API_URL is not set');
if (!privacyPolicyUrl)
  throw new Error('REACT_APP_PRIVACY_POLICY_URL is not set');
if (!sentryEnv) throw new Error('REACT_APP_SENTRY_ENVIRONMENT is not set');
if (!chatUri) throw new Error('REACT_APP_CHAT_URI is not set');
if (!nikeSKUUri) throw new Error('REACT_APP_NIKE_SKU_URI is not set');
if (!nikeSkuApiUrlTemplate)
  throw new Error('REACT_APP_NIKE_SKU_API_URL_TEMPLATE is not set');
if (!appEnv) throw new Error('REACT_APP_ENVIRONMENT is not set');
if (!nikeSkuEncryptionKey)
  throw new Error('REACT_APP_NIKE_SKU_ENCRYPTION_KEY is not set');
if (!identityServerUri)
  throw new Error('REACT_APP_IDENTITY_SERVER_URI is not set');
if (!identityServerClientId)
  throw new Error('REACT_APP_IDENTITY_SERVER_CLIENT_ID is not set');
if (!identityServerRedirectUri)
  throw new Error('REACT_APP_IDENTITY_SERVER_REDIRECT_URI is not set');
if (!identityServerScopes)
  throw new Error('REACT_APP_IDENTITY_SERVER_SCOPES is not set');
if (!atticusUrl) throw new Error('REACT_APP_ATTICUS_URL is not set');
if (!sisenseUrl) throw new Error('REACT_APP_SISENSE_URL is not set');
if (!sisenseToken) throw new Error('REACT_APP_SISENSE_TOKEN is not set');
if (!giphyToken) throw new Error('REACT_APP_GIPHY_TOKEN is not set');

if (!isValidEnvironment(appEnv)) {
  throw new Error(`REACT_APP_ENVIRONMENT has unknown value: ${appEnv}`);
}

if (!logLevel || !isLogLevelKey(logLevel)) {
  throw new Error(
    `REACT_APP_LOG_LEVEL unknown value or undefined: ${logLevel}`
  );
}
const env: EnvConfig = {
  tenantApiUrl,
  articlesApiUrl,
  channelsApiUrl,
  privacyPolicyUrl,
  sentryDns,
  sentryEnv,
  chatUri,
  logLevel,
  nikeSKUUri,
  nikeSkuApiUrlTemplate,
  appEnv,
  nikeSkuEncryptionKey,
  identityServerUri,
  identityServerClientId,
  identityServerRedirectUri,
  identityServerScopes,
  atticusUrl,
  sisenseUrl,
  sisenseToken,
  giphyToken,
};

export default env;
