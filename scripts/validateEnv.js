require('dotenv').config();

const appEnv = process.env['REACT_APP_ENVIRONMENT'] ?? 'production';

const keysToValidate = [
  'REACT_APP_TENANT_API_URL',
  appEnv === 'dev' ? undefined : 'REACT_APP_SENTRY_DNS',
  'REACT_APP_PRIVACY_POLICY_URL',
  'REACT_APP_SENTRY_ENVIRONMENT',
  'REACT_APP_CHAT_URI',
  'REACT_APP_ENVIRONMENT',
  'REACT_APP_NIKE_SKU_ENCRYPTION_KEY',
  'REACT_APP_IDENTITY_SERVER_URI',
  'REACT_APP_IDENTITY_SERVER_CLIENT_ID',
  'REACT_APP_IDENTITY_SERVER_REDIRECT_URI',
  'REACT_APP_IDENTITY_SERVER_SCOPES',
  'REACT_APP_ATTICUS_URL',
  'REACT_APP_NIKE_SKU_API_URL_TEMPLATE',
  'REACT_APP_SISENSE_URL',
].filter((value) => !!value);

keysToValidate.forEach((key) => {
  if (!process.env[key]) throw new Error(`${key} is not set`);
});
