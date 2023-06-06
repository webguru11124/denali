import { request } from '../../request';
import { GetChartRequest, ChartResponse } from '../types';

const getChart = ({
  type,
  dateFrom,
  dateTo,
  locationId,
  userId,
}: GetChartRequest) =>
  request().get<ChartResponse>(`/api/v1/kpis/charts/${type}`, {
    params: {
      date_from: dateFrom,
      date_to: dateTo,
      location_id: locationId,
      user_id: userId,
    },
  });

export default getChart;
