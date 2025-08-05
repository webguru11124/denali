import {
  ThreadMessagesCache,
  UnionMessage,
  OptimisticallyUpdatedMessage,
} from '../types';

const isOptimisticallyUpdatedMessage = (
  message: UnionMessage
): message is OptimisticallyUpdatedMessage => 'isResponseReceived' in message;

const updateOptimisticIDsForSorting = (
  cache: ThreadMessagesCache,
  clientIdToUpdate: string,
  realId: string
): ThreadMessagesCache => ({
  ...cache,
  pages: cache.pages.map((page, index) => {
    if (index !== 0) {
      return page;
    }

    return {
      ...page,
      data: {
        ...page.data,
        messages: page.data.messages.map((message: UnionMessage) => {
          const numericMessageClientId = Number(message.metadata?.clientId);
          const numericClientIdToUpdate = Number(clientIdToUpdate);
          const numericMessageId = Number(message.id);

          if (!isOptimisticallyUpdatedMessage(message)) {
            return message;
          }

          if (message.isResponseReceived) {
            return message;
          }

          if (numericMessageClientId > numericClientIdToUpdate) {
            return {
              ...message,
              id: String(
                numericMessageId - numericClientIdToUpdate + Number(realId)
              ),
            };
          }
          return message;
        }),
      },
    };
  }),
});

export default updateOptimisticIDsForSorting;
