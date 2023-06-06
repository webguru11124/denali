import { request } from '../../request';
import { UserMissionStatsResponse, GetUserStatsRequest } from '../types';

const getUsersStats = ({
  id,
  status,
  query,
  page = 1,
  perPage = 30,
  locationId,
}: GetUserStatsRequest) =>
  request().get<UserMissionStatsResponse>(
    `/api/v1/missions/${id}/usersByLocationStats`,
    {
      params: {
        page,
        per_page: perPage,
        query,
        status,
        location_id: locationId,
      },
    }
  );

export default getUsersStats;
