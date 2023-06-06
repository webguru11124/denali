import { NotificationFilter } from './constants';

export default {
  getNotifications: (filter: NotificationFilter | '' = '') => [
    'my-notifications',
    filter,
  ],
};
