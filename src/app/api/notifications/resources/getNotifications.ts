import { request } from '../../request';
import { NotificationFilter } from '../constants';
import { NotificationsResponse } from '../types';

const getNotifications = (status: NotificationFilter) =>
  request().get<NotificationsResponse>('/api/v3/notifications/my', {
    params: {
      status,
    },
  });

export default getNotifications;
