import { request } from '../../request';
import { BadgesResponse } from '../types';

const getBadges = (userId: number) =>
  request().get<BadgesResponse>(`/api/v1/badges/${userId}`);

export default getBadges;
