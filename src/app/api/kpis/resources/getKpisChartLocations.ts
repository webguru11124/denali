import { request } from '../../request';
import { ChartLocationsResponse, GetChartLocationsRequest } from '../types';

const getKpisChartLocations = ({
  dateFrom,
  dateTo,
  locationId,
  handle,
}: GetChartLocationsRequest) =>
  request().get<ChartLocationsResponse>(
    `/api/v1/kpis/charts/${handle}/locations`,
    {
      params: {
        date_from: dateFrom,
        date_to: dateTo,
        location_id: locationId,
      },
    }
  );

export default getKpisChartLocations;
