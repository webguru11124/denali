import { request } from '../../request';
import { UserStatsByLocationResponse } from '../types';

const getUserStatsByLocation = (missionId: number, locationId: number) =>
  request().get<UserStatsByLocationResponse>(
    `/api/v1/missions/${missionId}/statsByLocation`,
    {
      params: {
        location_id: locationId,
      },
    }
  );

export default getUserStatsByLocation;
