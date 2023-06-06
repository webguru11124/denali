import { request } from '../../request';

const markAsRead = (notificationsIds: Array<number>) =>
  request().post('/api/v3/notifications/mark?read=1', {
    items_ids: notificationsIds,
  });

export default markAsRead;
