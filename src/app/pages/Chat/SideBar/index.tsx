import { ThreadType } from 'app/api/chat/constants';
import avatarPlaceholder from 'assets/images/avatar-placeholder.png';
import { FC, useMemo, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDebounce } from 'use-debounce';

import { MappedListThread } from '../types';

import Header from './Header';
import Thread from './Thread';

interface SideBarProps {
  threads: Array<MappedListThread>;
  selectedThreadId?: string;
}

const SideBar: FC<SideBarProps> = ({ threads, selectedThreadId }) => {
  const [filterValue, setFilterValue] = useState('');

  const [debouncedFilterValue] = useDebounce(filterValue, 500);
  const threadsWithAvatars = useMemo(
    () =>
      threads
        // Remove deleted threads
        .filter(({ deletedOn }) => !deletedOn)
        .map(({ participants, type, topic, ...rest }) => ({
          ...rest,
          participants,
          topic,
          type,
          name:
            type === ThreadType.direct
              ? String(participants?.find(({ isMe }) => !isMe)?.name)
              : topic,
          avatar:
            participants?.find(({ isMe }) => !isMe)?.avatarUrl ||
            avatarPlaceholder,
        })),
    [threads]
  );

  const filteredThreadsWithAvatars = useMemo(
    () =>
      threadsWithAvatars
        .filter(({ topic, type, participants }) => {
          if (type === ThreadType.group) {
            return topic
              .toLowerCase()
              .includes(debouncedFilterValue.toLowerCase());
          }

          return participants?.find(
            ({ isMe, name }) =>
              !isMe &&
              name.toLowerCase().includes(debouncedFilterValue.toLowerCase())
          );
        })
        .sort((a, b) => {
          if (a.hasUnreadMessages && !b.hasUnreadMessages) return -1;
          if (b.hasUnreadMessages && !a.hasUnreadMessages) return 1;
          if (a.lastMessageReceivedOn && !b.lastMessageReceivedOn) return -1;
          if (b.lastMessageReceivedOn && !a.lastMessageReceivedOn) return 1;
          if (!a.lastMessageReceivedOn && !b.lastMessageReceivedOn) return -1;

          return new Date(a.lastMessageReceivedOn as string) >
            new Date(b.lastMessageReceivedOn as string)
            ? -1
            : 1;
        }),
    [debouncedFilterValue, threadsWithAvatars]
  );

  return (
    <div className="flex flex-col h-full ml-2">
      <Header
        filterValue={filterValue}
        onFilterChange={(e) => setFilterValue(e.target.value)}
      />
      <div className="mr-2 h-full">
        <Scrollbars>
          {filteredThreadsWithAvatars.map(
            ({
              name,
              id,
              lastMessageReceivedOn,
              avatar,
              type,
              hasUnreadMessages,
            }) => {
              const isDirect = type === ThreadType.direct;
              return (
                <Thread
                  key={id}
                  hasUnread={hasUnreadMessages}
                  isActive={id === selectedThreadId}
                  avatar={avatar}
                  isDirect={isDirect}
                  lastMessageReceivedOn={lastMessageReceivedOn}
                  name={name}
                  id={id}
                />
              );
            }
          )}
        </Scrollbars>
      </div>
    </div>
  );
};

export default SideBar;
