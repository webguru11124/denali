import { NotificationFilter } from 'app/api/notifications/constants';
import { useNotificationsTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';

import Switch from '../../Switch';

import useMarkAllAsReadMutation from './useMarkAllAsReadMutation';

export interface NotificationsHeaderProps {
  onFilterChange: () => void;
  filter: NotificationFilter;
}

const NotificationsHeader: FC<NotificationsHeaderProps> = ({
  filter,
  onFilterChange,
}) => {
  const { mutate, isLoading } = useMarkAllAsReadMutation();
  const { t } = useNotificationsTranslation();
  return (
    <div className="mt-4 flex items-center">
      <div className="flex items-center">
        <Switch
          onChange={onFilterChange}
          checked={filter === NotificationFilter.all}
        />
        <p className="ml-2 text-sm text-grayscale-secondary">
          {t('Include read')}
        </p>
      </div>
      <div className="ml-auto">
        <button
          type="button"
          onClick={() => mutate()}
          disabled={isLoading}
          className="text-sm disabled:opacity-50 text-focus"
        >
          {t('Mark all as read')}
        </button>
      </div>
    </div>
  );
};

export default NotificationsHeader;
