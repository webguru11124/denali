import { resources, queryKeys, types, constants } from 'app/api/missions';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import useUpdateMissionCompletion from '../../useUpdateMissionCompletion';

const usePostQuizAnswerMutation = (id: number, missionId: number) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.getMissionActivity(id);
  const updateMissionCompletion = useUpdateMissionCompletion(id, missionId);
  const { mutateAsync, isLoading, isError } = useMutation(
    (ids: Array<string>) => resources.postQuizAnswer(id, ids),
    {
      onMutate: async () => {
        updateMissionCompletion();
        await queryClient.cancelQueries(queryKey);

        const activity =
          queryClient.getQueryData<AxiosResponse<types.ActivityResponse>>(
            queryKey
          );

        if (activity) {
          queryClient.setQueryData(queryKey, () => ({
            ...activity,
            data: {
              ...activity.data,
              data: {
                ...activity.data.data,
                completed: constants.ActivityStatus.completed,
              },
            },
          }));
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  return { mutateAsync, isLoading, isError };
};

export default usePostQuizAnswerMutation;
