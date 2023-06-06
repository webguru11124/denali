import { ResponsiveMediaSizes, Response } from '../types';

import { NotificationModule, NotificationType } from './constants';

export interface User {
  id: number;
  name: string;
  avatars: ResponsiveMediaSizes;
}

export interface Notification {
  id: number;
  icon: null;
  title: string;
  description: string;
  itemId: number;
  module: NotificationModule;
  type: NotificationType;
  isOwner: boolean;
  user: User;
  timeAgo: string;
  isDeleted: boolean;
  read: boolean;
}

export type NotificationsResponse = Response<Array<Notification>>;
