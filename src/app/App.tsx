import { withProfiler, ErrorBoundary } from '@sentry/react';
import 'app/internationalization';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { BlockingProvider } from './blockings';
import { GenericError, ToastContainer } from './components';
import { Provider as FeatureFlagProvider } from './featureFlags';
import {
  RequestInstanceHandler,
  PageScrollHandler,
  SentryTenantTagHandler,
} from './handlers';
import './index.css';
import queryClient from './query';
import { Router } from './router';
import './sentry';
import { store, persistor } from './store';

const App: React.FC = () => (
  <div className="App">
    <ToastContainer />
    <ErrorBoundary fallback={<GenericError />}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<div>Loading</div>}>
          <SentryTenantTagHandler>
            <QueryClientProvider client={queryClient}>
              <RequestInstanceHandler>
                <FeatureFlagProvider>
                  <BlockingProvider>
                    <PageScrollHandler>
                      <Router />
                    </PageScrollHandler>
                  </BlockingProvider>
                </FeatureFlagProvider>
              </RequestInstanceHandler>
            </QueryClientProvider>
          </SentryTenantTagHandler>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </div>
);

export default withProfiler(App);
