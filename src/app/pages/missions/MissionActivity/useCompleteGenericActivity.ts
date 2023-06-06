import { resources, queryKeys, types, constants } from 'app/api/missions';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const useCompleteGenericActivity = (activityId: number) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.getMissionActivity(activityId);

  const { mutate, isLoading, isError } = useMutation(
    () => resources.completeGenericActivity(activityId),
    {
      onMutate: async () => {
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

  return { mutate, isLoading, isError };
};

export default useCompleteGenericActivity;
