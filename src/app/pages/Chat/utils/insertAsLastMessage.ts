import { ThreadMessagesCache, UnionMessage } from '../types';

type InsertAsLastMessage = (
  message: UnionMessage,
  cache: ThreadMessagesCache
) => ThreadMessagesCache;

const insertAsLastMessage: InsertAsLastMessage = (message, cache) => ({
  ...cache,
  pages: cache.pages.map((page, index) => {
    if (index !== 0) {
      return page;
    }

    return {
      ...page,
      data: {
        ...page.data,
        messages: [message, ...page.data.messages],
      },
    };
  }),
});

export default insertAsLastMessage;
