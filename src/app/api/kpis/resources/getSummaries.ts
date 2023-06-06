import { request } from '../../request';
import { SummariesResponse, GetSummariesRequest } from '../types';

const getSelectedUserLocation = (selectedUserLocation?: boolean) => {
  if (selectedUserLocation === undefined) return undefined;

  return selectedUserLocation ? 1 : 0;
};

const getSummaries = ({
  dateFrom,
  dateTo,
  locationId,
  userId,
  selectedUserLocation,
}: GetSummariesRequest) =>
  request().get<SummariesResponse>('/api/v1/kpis/summaries', {
    params: {
      date_from: dateFrom,
      date_to: dateTo,
      location_id: locationId,
      user_id: userId,
      selected_user_location: getSelectedUserLocation(selectedUserLocation),
    },
  });

export default getSummaries;
