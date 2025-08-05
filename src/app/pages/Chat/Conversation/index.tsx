import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { ChatMessageType } from 'app/api/chat/constants';
import { Message as ChatMessage } from 'app/api/chat/types';
import { PageLoader } from 'app/components';
import avatarPlaceholder from 'assets/images/avatar-placeholder.png';
import {
  FC,
  useEffect,
  useLayoutEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { useMessages, useThreadParticipants, useThread } from '../hooks';
import {
  ParticipantAddedGroupedMessage,
  ParticipantRemovedGroupedMessage,
} from '../types';
import { groupMessagesByOwnership, orderAndReduceMessages } from '../utils';

import ChatEventLabel from './ChatEventLabel';
import Header from './Header';
import MessageForm from './MessageForm';
import MessageGroup from './MessageGroup';
import ReplyPreview from './ReplyPreview';
import ThreadMetadataUpdater from './ThreadMetadataUpdater';

interface ConversationProps {
  id: string;
  isDirect: boolean;
  title: string;
}

const reduceUsersNames = (
  message: ParticipantRemovedGroupedMessage | ParticipantAddedGroupedMessage
): string => {
  const names = message.message?.content?.participants?.reduce(
    (acc, { id: { fullName } }) => {
      if (acc.length === 0) {
        return fullName;
      }

      return `${acc}, ${fullName}`;
    },
    ''
  );

  return String(names);
};

const Conversation: FC<ConversationProps> = ({ id, isDirect, title }) => {
  const { data: user } = useAuthenticatedUser();

  if (!user) throw new Error('[Conversation]: no authenticated user');
  const { messages, firstMessage, fetchNextPage, isFetchingNextPage, hasMore } =
    useMessages(id);
  const { data: thread, isLoading: isThreadLoading } = useThread(id);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const [messageToReply, setMessageToReply] = useState<ChatMessage | null>(
    null
  );
  const [scrollRef, setScrollRef] = useState<Scrollbars | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const { data: participants, isLoading: isParticipantsLoading } =
    useThreadParticipants(id);

  useEffect(() => {
    setShouldScrollToBottom(true);
  }, [id]);

  const groupedMessages = useMemo(() => {
    if (messages) {
      return groupMessagesByOwnership(orderAndReduceMessages(messages));
    }

    return undefined;
  }, [messages]);
  const avatarUrl = useMemo(() => {
    if (!participants) return undefined;
    return participants.find(({ userId }) => userId !== user.id)?.avatarUrl;
  }, [participants, user.id]);

  const participantIds = useMemo(() => {
    if (!participants) return [];
    return participants.map(({ userId: participantId }) => participantId);
  }, [participants]);

  const conversationTitle = useMemo(() => {
    if (!isDirect) return title;
    if (!participants) return undefined;
    return participants.find(({ userId }) => userId !== user.id)?.name;
  }, [isDirect, participants, title, user.id]);

  useLayoutEffect(() => {
    if (scrollRef && groupedMessages?.length && shouldScrollToBottom) {
      scrollRef.scrollToBottom();
      setShouldScrollToBottom(false);
    }
  }, [scrollRef, shouldScrollToBottom, groupedMessages]);

  useLayoutEffect(() => {
    if (groupedMessages && !shouldScrollToBottom) {
      scrollRef?.scrollTop(scrollRef.getScrollHeight() - scrollTop);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupedMessages]);

  const onSendMessageOptimisticSuccess = useCallback(() => {
    setMessageToReply(null);
    setShouldScrollToBottom(true);
  }, []);

  if (!participants || isParticipantsLoading || isThreadLoading) {
    return <PageLoader />;
  }
  return (
    <div className="flex flex-col w-full h-full">
      <ThreadMetadataUpdater
        // IMPORTANT
        // Thread id is passed as key intentionally.
        // If we don't, then metadata updates will not happen
        // as often as need.
        key={id}
        threadId={id}
        firstMessage={firstMessage}
      />
      <Header
        avatar={avatarUrl || avatarPlaceholder}
        title={conversationTitle || ''}
        participantsIds={participantIds}
        isDirect={isDirect}
        isAdmin={Boolean(thread?.createdBy?.isMe)}
      />
      <div className="flex-1 h-full">
        <Scrollbars
          onUpdate={(data) => {
            // Get distance from bottom to current scrolled position
            setScrollTop(data.scrollHeight - data.scrollTop);

            if (messages && !isFetchingNextPage && hasMore && data.top < 0.2) {
              fetchNextPage();
            }
          }}
          ref={setScrollRef}
        >
          <div className="pl-6 pr-4">
            {groupedMessages ? (
              groupedMessages.map((message, index) => {
                const key = index.toString();
                switch (message.type) {
                  case ChatMessageType.text:
                    return (
                      <MessageGroup
                        onReply={setMessageToReply}
                        key={key}
                        groupedMessage={message}
                      />
                    );
                  case ChatMessageType.participantRemoved:
                  case ChatMessageType.participantAdded:
                    return (
                      <ChatEventLabel
                        key={key}
                        label={reduceUsersNames(message)}
                        type={message.type}
                      />
                    );
                  case ChatMessageType.topicUpdated:
                    return (
                      <ChatEventLabel
                        key={key}
                        isDirect={isDirect}
                        type={message.type}
                        label={String(
                          isDirect
                            ? conversationTitle
                            : message.message?.content?.topic
                        )}
                      />
                    );
                  default:
                    return null;
                }
              })
            ) : (
              <PageLoader />
            )}
          </div>
        </Scrollbars>
      </div>
      <div className="mt-auto">
        {!!messageToReply && (
          <ReplyPreview
            onClose={() => setMessageToReply(null)}
            reply={messageToReply}
          />
        )}
        <MessageForm
          reply={messageToReply ?? undefined}
          onOptimisticSuccess={onSendMessageOptimisticSuccess}
          title={conversationTitle || ''}
          threadId={id}
        />
      </div>
    </div>
  );
};

export default Conversation;
