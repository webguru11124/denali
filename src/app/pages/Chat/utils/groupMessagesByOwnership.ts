import { ChatMessageType } from 'app/api/chat/constants';
import { isDefined } from 'app/utils';
import cloneDeep from 'lodash/cloneDeep';

import {
  GroupedMessage,
  GroupMessagesByOwnership,
  UpdateGroupedMessage,
  TextGroupedMessage,
} from '../types';

const isMessageText = (
  message: GroupedMessage
): message is TextGroupedMessage => message.type === ChatMessageType.text;

const updateGroupedMessage: UpdateGroupedMessage = (messages, message) => {
  const clonedMessages = cloneDeep(messages);
  const lastMessage = clonedMessages.pop();

  if (
    isDefined(lastMessage) &&
    isMessageText(lastMessage) &&
    lastMessage?.ownerId === message.sender?.userId
  ) {
    return [
      ...clonedMessages,
      {
        ...lastMessage,
        messages: [...lastMessage.messages, message],
      },
    ];
  }

  return [
    ...messages,
    {
      messages: [message],
      isMe: Boolean(message?.isMine),
      ownerId: Number(message.sender?.userId),
      userAvatar: String(message.sender?.avatar),
      type: ChatMessageType.text,
      userName: String(message.sender?.fullName),
    },
  ];
};

const groupMessagesByOwnership: GroupMessagesByOwnership = (messages) => {
  const groupedMessages = messages.reduce<Array<GroupedMessage>>(
    (acc, message) => {
      switch (message.type) {
        case ChatMessageType.text:
          return updateGroupedMessage(acc, message);
        case ChatMessageType.participantAdded:
        case ChatMessageType.participantRemoved:
        case ChatMessageType.topicUpdated:
          return [
            ...acc,
            {
              type: message.type,
              message,
            },
          ];

        default:
          // TODO: once all types implemented throw error
          return acc;
      }
    },
    []
  );

  return groupedMessages;
};

export default groupMessagesByOwnership;
