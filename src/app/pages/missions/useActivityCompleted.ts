import { routes } from 'app/router';
import { useHistory } from 'react-router-dom';

import useUpdateMissionCompletion from './useUpdateMissionCompletion';

const useActivityCompleted = (
  activityId: number,
  nextActivityId?: number,
  missionId?: number
) => {
  const history = useHistory();
  const updateMissionCompletion = useUpdateMissionCompletion(
    activityId,
    missionId
  );
  return () => {
    updateMissionCompletion();

    if (nextActivityId && missionId)
      return history.push(
        routes.missionActivity.create(missionId, nextActivityId)
      );

    if (missionId) return history.push(routes.mission.create(missionId));

    return undefined;
  };
};

export default useActivityCompleted;
