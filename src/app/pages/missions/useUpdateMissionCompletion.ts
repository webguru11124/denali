import { queryKeys, types, constants } from 'app/api/missions';
import { mapMission } from 'app/api/missions/utils';
import { AxiosResponse } from 'axios';
import { useQueryClient } from 'react-query';

const useUpdateMissionCompletion = (activityId: number, missionId?: number) => {
  const queryClient = useQueryClient();
  return async () => {
    if (missionId) {
      // Update activity in mission activities to completed
      const queryKey = queryKeys.getMission(missionId);
      await queryClient.cancelQueries(queryKey);

      queryClient.setQueryData<
        AxiosResponse<types.SingleMissionResponse> | undefined
      >(queryKey, (mission) => {
        if (!mission) return undefined;

        const updatedMission: AxiosResponse<types.SingleMissionResponse> = {
          ...mission,
          data: {
            ...mission.data,
            data: {
              ...mission.data.data,
              series: mission.data.data.series.map(
                ({ activities, ...series }) => {
                  let completedSeriesActivities = series.completedActivities;
                  return {
                    ...series,
                    activities: activities.map(
                      ({ id, completed, ...activity }) => {
                        const isCurrentActivity = id === activityId;
                        if (isCurrentActivity) {
                          completedSeriesActivities += 1;
                        }
                        return {
                          ...activity,
                          id,
                          completed: isCurrentActivity
                            ? constants.ActivityStatus.completed
                            : completed,
                        };
                      }
                    ),
                    completedActivities: completedSeriesActivities,
                  };
                }
              ),
            },
          },
        };

        return {
          ...updatedMission,
          // Update next activity status to active
          data: mapMission(updatedMission.data),
        };
      });
    }
  };
};

export default useUpdateMissionCompletion;
