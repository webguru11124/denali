import { request } from '../../request';

const markAllAsRead = () => request().patch('/api/v3/notifications/my/mark');

export default markAllAsRead;
