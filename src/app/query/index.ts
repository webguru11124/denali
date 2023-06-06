import { captureException } from '@sentry/react';
import { reset as resetChatRequest } from 'app/api/chat/request';
import { reset as resetRequest } from 'app/api/request';
import { resetState as resetReduxState } from 'app/store/utils';
import { logger } from 'app/utils';
import { isAxiosError } from 'axios';
import { QueryClient, QueryCache } from 'react-query';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: async (error: unknown) => {
      captureException(error);
      logger.error(error);

      if (!isAxiosError(error)) return;

      if (error.response?.status === 401) {
        queryClient.clear();
        resetReduxState();
        await queryClient.cancelQueries();
        queryClient.removeQueries();
        resetRequest();
        resetChatRequest();
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

export default queryClient;
