import { request } from '../../request';
import { SeenLocationResponse } from '../types';

const getSeenLocation = (articleId: number, locationId: number) =>
  request().get<SeenLocationResponse>(
    `/api/v1/news-feed/${articleId}/seen/by-team-users/${locationId}`
  );

export default getSeenLocation;
