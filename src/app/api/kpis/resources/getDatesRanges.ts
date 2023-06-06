import { request } from '../../request';
import { DatesRangesResponse } from '../types';

const getDatesRanges = () =>
  request().get<DatesRangesResponse>('/api/v1/kpis/settings/dates-ranges');

export default getDatesRanges;
