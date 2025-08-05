import { cx } from '@emotion/css';
import { MessageFile, Message as ChatMessage } from 'app/api/chat/types';
import { ComplaintTypes } from 'app/api/complaints/constants';
import BlockingContext from 'app/blockings/context';
import {
  useChatTranslation,
  useCommonTranslation,
} from 'app/internationalization/hooks';
import { FC, memo, useState, useMemo, useContext } from 'react';

import ReplyMessage from '../ReplyMessage';

import CreatedAt from './CreatedAt';
import Files from './Files';
import MessageControls from './MessageControls';

interface MessageProps {
  content?: string;
  userName: string;
  isMe: boolean;
  isFirst: boolean;
  isLast: boolean;
  createdAt: string;
  files?: Array<MessageFile>;
  reply?: Omit<ChatMessage, 'reply'>;
  messageId: string;
  deletedAt?: string;
  onReply?: () => void;
  ownerId: number;
}

const getContainerRoundedClassName = (
  isMe: boolean,
  isFirst: boolean,
  isLast: boolean
) => {
  if (isMe)
    return cx('rounded-l-xl', isFirst ? 'rounded-tr-xl' : 'rounded-tr-xs');

  return cx(
    'rounded-r-xl',
    isFirst || !isLast ? 'rounded-tl-xl' : 'rounded-tl-xs'
  );
};

const Message: FC<MessageProps> = ({
  content,
  userName,
  isMe,
  isFirst,
  isLast,
  files,
  createdAt,
  messageId,
  deletedAt,
  reply,
  onReply,
  ownerId,
}) => {
  const [shouldDisplayControls, setShouldDisplayControls] = useState(false);
  const { t } = useChatTranslation();
  const { t: tCommon } = useCommonTranslation();

  const { isHiddenOrBlocked } = useContext(BlockingContext);

  const isHidden = useMemo(
    () =>
      isHiddenOrBlocked(Number(messageId), ownerId, ComplaintTypes.chatMessage),
    [messageId, ownerId, isHiddenOrBlocked]
  );

  const getContent = () => {
    if (deletedAt) {
      return t('This message was deleted.');
    }

    return content;
  };

  const getContainerStyles = () => {
    if (deletedAt) {
      return 'bg-white border border-gray-dark text-grayscale-secondary';
    }

    return {
      'bg-focus text-white': isMe,
      'bg-gray': !isMe,
    };
  };

  const isDeleted = Boolean(deletedAt);
  const contentToDisplay = getContent();

  return (
    <>
      {reply && (
        <ReplyMessage isParentMine={isMe} reply={reply} ownerId={ownerId} />
      )}
      <div
        onMouseEnter={() => {
          setShouldDisplayControls(true);
        }}
        onMouseLeave={() => {
          setShouldDisplayControls(false);
        }}
        className={cx('relative flex flex-col', {
          'mb-1': !isLast,
          'items-end': isMe,
          'items-start': !isMe,
        })}
      >
        {shouldDisplayControls && !isHidden && (
          <MessageControls
            onReply={onReply}
            messageId={messageId}
            isMe={isMe}
            ownerId={ownerId}
            userName={userName}
          />
        )}
        {contentToDisplay && (
          <div
            className={cx(
              'py-2 px-3 rounded-xs',
              getContainerRoundedClassName(isMe, isFirst, isLast),
              getContainerStyles()
            )}
          >
            <div>
              {isFirst && !isMe && (
                <div className="line-clamp-1 font-bold text-sm">{userName}</div>
              )}
              {isHidden ? (
                <div className="break-all text-sm w-full text-grayscale-secondary">
                  {tCommon('This comment has been hidden.')}
                </div>
              ) : (
                <div className="break-all text-sm w-full">
                  {contentToDisplay}
                </div>
              )}
            </div>
            <CreatedAt
              createdAt={createdAt}
              isMe={isMe}
              isDeleted={isDeleted}
            />
          </div>
        )}
        <div>
          {files && !isDeleted && !isHidden && (
            <Files isMe={isMe} uploadedAt={createdAt} files={files} />
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Message);
