import { Message } from 'app/api/chat/types';

import { ThreadMessagesCache } from '../types';

type RemovedMessage = Message | null;

type RemoveMessageById = (
  data: ThreadMessagesCache,
  messageId: string
) => [ThreadMessagesCache, RemovedMessage];

const removeMessageByClientId: RemoveMessageById = (data, messageId) => {
  let removedMessage: RemovedMessage = null;

  return [
    {
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        data: {
          ...page.data,
          messages: page.data.messages.filter(({ metadata, ...rest }) => {
            if (metadata?.clientId === messageId) {
              // Cache message to be returned for later consumption
              removedMessage = {
                ...rest,
                ...(metadata || {}),
              };

              return false;
            }

            return true;
          }),
        },
      })),
    },
    removedMessage,
  ];
};

export default removeMessageByClientId;
