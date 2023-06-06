import { request } from '../../request';
import { MissionStatsResponse } from '../types';

const getMissionStats = (id: number) =>
  request().get<MissionStatsResponse>(`/api/v1/missions/${id}/stats`);

export default getMissionStats;
