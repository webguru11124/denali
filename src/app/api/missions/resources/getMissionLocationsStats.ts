import { request } from '../../request';
import { MissionLocationsStatsResponse } from '../types';

const getMissionLocationsStats = (
  id: number,
  page: number,
  query: string,
  perPage = 30
) =>
  request().get<MissionLocationsStatsResponse>(
    `/api/v1/missions/${id}/locationsStats`,
    {
      params: {
        page,
        per_page: perPage,
        query,
      },
    }
  );

export default getMissionLocationsStats;
