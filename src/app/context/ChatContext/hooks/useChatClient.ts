import { useContext } from 'react';

import ChatContext from '../ChatContext';

const useChatClient = () => {
  const { chatClient } = useContext(ChatContext);

  return chatClient;
};

export default useChatClient;
