import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { NotificationFilter } from 'app/api/notifications/constants';
import { useNotificationsQuery } from 'app/api/notifications/hooks';
import { Container } from 'app/components';
import {
  NotificationsHeader,
  NotificationsCard,
} from 'app/components/Notifications';
import { FC, useState } from 'react';

const Notifications: FC = () => {
  const { data: user } = useAuthenticatedUser();
  const [notificationFilter, setNotificationFilter] =
    useState<NotificationFilter>(NotificationFilter.unread);
  const { data, isLoading } = useNotificationsQuery(
    notificationFilter,
    Boolean(user)
  );

  return (
    <div className="flex justify-center">
      <Container>
        <div className="shadow-atobi rounded-lg p-8 mb-12 mt-12">
          <NotificationsHeader
            filter={notificationFilter}
            onFilterChange={() => {
              setNotificationFilter((prev) => {
                if (prev === NotificationFilter.all) {
                  return NotificationFilter.unread;
                }

                return NotificationFilter.all;
              });
            }}
          />
          <div className="mt-8">
            <NotificationsCard
              isLoading={isLoading}
              notifications={data || []}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Notifications;
