import { request } from '../../request';
import { MissionReportResponse } from '../types';

const getMissionReport = (id: number) =>
  request().get<MissionReportResponse>(`/api/v1/missions/${id}/stats/export`);

export default getMissionReport;
