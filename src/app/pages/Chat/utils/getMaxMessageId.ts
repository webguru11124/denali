import maxBy from 'lodash/maxBy';

import { ThreadMessagesCache, UnionMessage } from '../types';

type GetMaxMessageId = (
  messageCache: ThreadMessagesCache
) => string | undefined;

const getMaxMessageId: GetMaxMessageId = (messageCache) => {
  const reducedPages = messageCache.pages.reduce<Array<UnionMessage>>(
    (acc, page) => [...acc, ...page.data.messages],
    []
  );

  return maxBy(reducedPages, (message) => Number(message.id))?.id;
};

export default getMaxMessageId;
