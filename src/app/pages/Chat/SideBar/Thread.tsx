import { cx } from '@emotion/css';
import { routes } from 'app/router';
import { dayjs } from 'app/utils';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ThreadPicture } from '../components';

interface ThreadProps {
  isDirect: boolean;
  name: string;
  avatar: string;
  hasUnread: boolean;
  lastMessageReceivedOn?: string;
  id: string;
  isActive: boolean;
}

const Thread: FC<ThreadProps> = ({
  isDirect,
  name,
  avatar,
  hasUnread,
  lastMessageReceivedOn,
  id,
  isActive,
}) => (
  <Link to={routes.chat.create(id)}>
    <div
      className={cx('flex py-2 px-3 rounded-lg overflow-hidden', {
        'bg-focus-background': isActive,
      })}
    >
      <ThreadPicture
        isActive={isActive}
        isDirect={isDirect}
        name={name}
        avatar={avatar}
      />
      <div className="flex w-full ml-3">
        <div
          className={cx('line-clamp-1 break-all h-6 mr-2 text-sm', {
            'font-bold': hasUnread,
          })}
        >
          {name}
        </div>
        <div className="ml-auto">
          {!!lastMessageReceivedOn && (
            <div
              className={cx('text-xs whitespace-nowrap line-clamp-1', {
                'font-bold': hasUnread,
              })}
            >
              {dayjs(lastMessageReceivedOn).fromNow()}
            </div>
          )}
          {hasUnread && (
            <div className="bg-focus ml-auto w-2 h-2 rounded-full mt-2" />
          )}
        </div>
      </div>
    </div>
  </Link>
);

export default Thread;
