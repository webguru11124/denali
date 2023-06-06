import { cx } from '@emotion/css';
import { Message as ChatMessage } from 'app/api/chat/types';
import { FC } from 'react';

import { TextGroupedMessage } from '../../types';

import Message from './Message';

interface MessageGroupProps {
  groupedMessage: TextGroupedMessage;
  onReply?: (message: ChatMessage) => void;
}

const MessageGroup: FC<MessageGroupProps> = ({ groupedMessage, onReply }) => {
  const { isMe, userAvatar, userName, ownerId } = groupedMessage;
  return (
    <div
      className={cx('flex mb-6', {
        'flex-row-reverse ml-16': isMe,
        'mr-16': !isMe,
      })}
    >
      {!isMe && (
        <div className={cx('w-8 h-8 mt-auto mb-1', isMe ? 'ml-2' : 'mr-2')}>
          <img
            src={userAvatar}
            alt={userName}
            className="w-full h-full rounded object-cover"
          />
        </div>
      )}
      <div
        className={cx('flex flex-col', {
          'text-right': isMe,
        })}
      >
        {groupedMessage.messages.map((message, index) => (
          <Message
            key={message.id}
            messageId={message.id}
            isLast={index === groupedMessage.messages.length - 1}
            isFirst={index === 0}
            files={message.files}
            ownerId={ownerId}
            isMe={Boolean(message.isMine)}
            content={message.content?.message}
            userName={String(message.sender?.fullName)}
            createdAt={message.createdOn}
            deletedAt={message.deletedOn}
            reply={message.reply}
            onReply={() => onReply?.(message)}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageGroup;
