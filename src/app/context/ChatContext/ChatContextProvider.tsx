import { ChatClient as ChatClientLib } from '@azure/communication-chat';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import config from 'app/config';
import { useSelector } from 'app/hooks';
import { selectors } from 'app/store/chat';
import { logger } from 'app/utils';
import { useState, useEffect, ReactNode } from 'react';

import ChatContext from './ChatContext';
import { ChatClient } from './types';

interface Props {
  children: ReactNode;
}
const ChatContextProvider = ({ children }: Props) => {
  const [chatClient, setChatClient] = useState<ChatClient>(undefined);
  const cachedChatToken = useSelector(selectors.getChatToken);

  useEffect(() => {
    if (!cachedChatToken || chatClient) return undefined;

    try {
      const tokenCredential = new AzureCommunicationTokenCredential(
        cachedChatToken
      );
      const client = new ChatClientLib(config.env.chatUri, tokenCredential);
      setChatClient(client);
    } catch (error) {
      logger.error(error);
    }

    return undefined;
  }, [cachedChatToken, chatClient]);

  return (
    <ChatContext.Provider
      value={{
        chatClient,
        chatClientUpdated: setChatClient,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
