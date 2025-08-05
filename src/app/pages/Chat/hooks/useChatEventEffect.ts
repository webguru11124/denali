import {
  ChatMessageReceivedEvent,
  ChatThreadCreatedEvent,
  ChatThreadDeletedEvent,
  ChatMessageDeletedEvent,
  ChatEventId,
} from '@azure/communication-signaling';
import { useChatClient } from 'app/context/ChatContext/hooks';
import { useEffect } from 'react';

interface BaseHandler<Listener extends (e: any) => void> {
  type: ChatEventId;
  listener: Listener;
}

interface ChatMessageHandler
  extends BaseHandler<(event: ChatMessageReceivedEvent) => void> {
  type: 'chatMessageReceived';
}

interface ThreadCreatedHandler
  extends BaseHandler<(event: ChatThreadCreatedEvent) => void> {
  type: 'chatThreadCreated';
}

interface ThreadDeletedHandler
  extends BaseHandler<(event: ChatThreadDeletedEvent) => void> {
  type: 'chatThreadDeleted';
}

interface ChatMessageDeletedHandler
  extends BaseHandler<(event: ChatMessageDeletedEvent) => void> {
  type: 'chatMessageDeleted';
}

type Handler =
  | ChatMessageHandler
  | ThreadCreatedHandler
  | ThreadDeletedHandler
  | ChatMessageDeletedHandler;

const useChatEventEffect = (
  handler: Handler,
  isNotificationsEnabled: boolean
) => {
  const chatClient = useChatClient();

  useEffect(() => {
    if (!isNotificationsEnabled || !chatClient) return undefined;
    // @ts-ignore
    chatClient.on(handler.type, handler.listener);

    return () => {
      // @ts-ignore
      chatClient.off(handler.type, handler.listener);
    };
  }, [chatClient, handler.listener, handler.type, isNotificationsEnabled]);
};

export default useChatEventEffect;
