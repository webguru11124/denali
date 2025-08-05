import { request } from '../../request';
import { MissionsResponse, MissionsRequestData } from '../types';

const getCompletedMissions = ({
  page,
  perPage,
  query,
  tags,
}: MissionsRequestData) =>
  request().get<MissionsResponse>('/api/v1/missions/completed', {
    params: {
      page,
      tags,
      query,
      per_page: perPage,
    },
  });

export default getCompletedMissions;
