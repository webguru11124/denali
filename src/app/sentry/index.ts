import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import config from 'app/config';

if (config.env.sentryDns) {
  Sentry.init({
    dsn: config.env.sentryDns,
    environment: config.env.sentryEnv,
    integrations: [new Integrations.BrowserTracing({})],
  });
}
