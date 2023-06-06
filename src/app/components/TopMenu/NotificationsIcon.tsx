import { cx } from '@emotion/css';
import { FC } from 'react';
import NotificationLineIcon from 'remixicon-react/NotificationLineIcon';

interface NotificationsIconProps {
  hasUnread: boolean;
  isActive: boolean;
}

const NotificationsIcon: FC<NotificationsIconProps> = ({
  hasUnread,
  isActive,
}) => (
  <div
    className={cx(
      'group hover:bg-focus-background w-10 h-10 flex items-center justify-center rounded-lg',
      {
        'bg-focus-background': isActive,
      }
    )}
  >
    <div className="relative">
      {hasUnread && (
        <div className="absolute right-0 mt-0.5 rounded-full w-2 h-2 border border-white bg-error" />
      )}
      <NotificationLineIcon
        className={cx('group-hover:text-focus w-6 h-6', {
          'text-focus': isActive,
        })}
      />
    </div>
  </div>
);

export default NotificationsIcon;
