import { request } from '../../request';
import { ActivityResponse } from '../types';
import { mapActivity } from '../utils';

const getMissionActivity = (activityId: number) =>
  request().get<ActivityResponse>(`/api/v1/activities/${activityId}`, {
    transformResponse: (response) => {
      const data = JSON.parse(response);

      return mapActivity(data);
    },
  });

export default getMissionActivity;
