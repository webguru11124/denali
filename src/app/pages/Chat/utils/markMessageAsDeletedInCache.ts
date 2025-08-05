import { AxiosResponse } from 'axios';

import { ThreadMessagesCache, QueryCacheMessageResponse } from '../types';

type Page = AxiosResponse<QueryCacheMessageResponse>;

const mapPage = (page: Page, messageToDeleteId: string): Page => ({
  ...page,
  data: {
    ...page.data,
    messages: page.data.messages.map(({ id, ...rest }) => {
      if (id !== messageToDeleteId) {
        return {
          id,
          ...rest,
        };
      }

      return {
        id,
        ...rest,
        deletedOn: new Date().toISOString(),
      };
    }),
  },
});

const markMessageAsDeletedInCache = (
  cache: ThreadMessagesCache,
  messageId: string
): ThreadMessagesCache => ({
  ...cache,
  pages: cache.pages.map((page) => mapPage(page, messageId)),
});

export default markMessageAsDeletedInCache;
