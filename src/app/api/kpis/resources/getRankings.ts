import { request } from '../../request';
import { GetRankingsRequest, RankingsResponse } from '../types';

const getRankings = ({
  type,
  dateFrom,
  dateTo,
  locationId,
}: GetRankingsRequest) =>
  request().get<RankingsResponse>(`/api/v1/kpis/scoreboard/${type}`, {
    params: {
      date_from: dateFrom,
      date_to: dateTo,
      location_id: locationId,
    },
  });

export default getRankings;
