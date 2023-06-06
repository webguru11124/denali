import { Notification } from 'app/api/notifications/types';
import { FC } from 'react';

import Spinner from '../Spinner';

import NotificationRow from './NotificationRow';
import NotificationsEmpty from './NotificationsEmpty';

export interface NotificationsCardProps {
  isLoading?: boolean;
  notifications: Array<Notification>;
}

const NotificationsCard: FC<NotificationsCardProps> = ({
  isLoading,
  notifications,
}) => {
  const renderNotifications = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full w-full">
          <Spinner />
        </div>
      );
    }

    if (notifications.length === 0) {
      return <NotificationsEmpty />;
    }

    return (
      <div>
        {notifications.map(
          ({
            user: { avatars, name, id: userId },
            description,
            timeAgo,
            title,
            id,
            read,
            module,
            itemId,
            type,
          }) => (
            <NotificationRow
              key={id}
              id={id}
              type={type}
              avatars={avatars}
              timeAgo={timeAgo}
              userName={name}
              isRead={read}
              module={module}
              itemId={itemId}
              userId={userId}
              description={description}
              title={title}
            />
          )
        )}
      </div>
    );
  };

  return <div className="w-full h-full">{renderNotifications()}</div>;
};

export default NotificationsCard;
