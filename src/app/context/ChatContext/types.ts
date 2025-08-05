import { ChatClient as ChatClientLib } from '@azure/communication-chat';

export type ChatClient = ChatClientLib | undefined;

export interface ChatContext {
  chatClient: ChatClient;
  chatClientUpdated: (client: ChatClient) => void;
}
