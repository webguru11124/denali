import { cx } from '@emotion/css';
import {
  NotificationModule,
  NotificationType,
} from 'app/api/notifications/constants';
import { ResponsiveMediaSizes } from 'app/api/types';
import { useNotificationsTranslation } from 'app/internationalization/hooks';
import { routes, constants } from 'app/router';
import { createSrcSet } from 'app/utils';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../Avatar';
import Dot from '../Dot';

import useMarkAsReadMutation from './useMarkAsReadMutation';

interface NotificationRowProps {
  avatars: ResponsiveMediaSizes;
  userName: string;
  userId: number;
  description: string;
  timeAgo: string;
  title: string;
  className?: string;
  isRead: boolean;
  module: NotificationModule;
  itemId: number;
  type: NotificationType;
  id: number;
}

const getNotificationUrl = ({
  module,
  itemId,
}: {
  module: NotificationModule;
  itemId: number;
}) => {
  switch (module) {
    case NotificationModule.newsFeed:
      return routes.newsArticle.create(constants.newsTypes.relevant, itemId);
    case NotificationModule.socialFeed:
      return routes.socialFeed.create(itemId);
    default:
      throw new Error(`Unknown module type: ${module}`);
  }
};

const NotificationRow: FC<NotificationRowProps> = ({
  avatars,
  userName,
  userId,
  className,
  description,
  timeAgo,
  title,
  module,
  type,
  itemId,
  isRead,
  id,
}) => {
  const { mutate: markAsRead } = useMarkAsReadMutation();
  const { t } = useNotificationsTranslation();
  const notificationUrl = getNotificationUrl({ module, itemId });

  const getEmoji = () => {
    switch (type) {
      case NotificationType.comment:
        return t('Emoji_comment');
      case NotificationType.commentLike:
        return t('Emoji_comment_like');
      case NotificationType.like:
        return t('Emoji_like');
      case NotificationType.newsFeed:
        return t('Emoji_news_feed');
      default:
        throw new Error(`Unknown notification type: ${type}`);
    }
  };
  return (
    <div
      className={cx(
        'w-full hover:bg-focus-background pt-2 pb-3 pl-4 rounded',
        className
      )}
    >
      <Link
        to={notificationUrl}
        onClick={() => {
          markAsRead([id]);
        }}
        className="w-full"
      >
        <div className="flex w-full">
          <div className="w-12 h-12 min-w-12 min-h-12 mr-2 relative">
            {!isRead && (
              <div className="rounded-full bg-focus w-2 h-2 absolute top-1/2 -left-3 transform -translate-y-1/2" />
            )}
            <p className="-bottom-1/2 -right-1/2 transform -translate-y-2/3 -translate-x-2/3 absolute">
              {getEmoji()}
            </p>
            <Avatar
              className="w-full h-full object-cover"
              srcSet={createSrcSet(avatars)}
              alt={userName}
              id={userId}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex text-sm h-6 text-grayscale-primary break-all line-clamp-1 overflow-hidden">
              <span className="font-bold mr-1">{userName}</span>
              <span>{description.toLowerCase()}</span>
            </div>
            <div className="mt-auto text-sm line-clamp-1 break-all text-grayscale-secondary">
              {timeAgo}
              <Dot className="text-xs mx-2" />
              {title}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NotificationRow;
