import { createContext } from 'react';

import { ChatContext as ChatContextType } from './types';

const ChatContext = createContext<ChatContextType>({
  chatClient: undefined,
  chatClientUpdated: () => null,
});

export default ChatContext;
