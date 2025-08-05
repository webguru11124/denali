import { request } from '../../request';
import { LocationResponse } from '../types';

const getKpisSummaries = () =>
  request().get<LocationResponse>('/api/v1/kpis/summaries');

export default getKpisSummaries;
