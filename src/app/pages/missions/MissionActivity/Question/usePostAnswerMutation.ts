import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { types, resources, queryKeys } from 'app/api/missions';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import useUpdateMissionCompletion from '../../useUpdateMissionCompletion';

const usePostAnswerMutation = (id: number, missionId: number) => {
  const queryClient = useQueryClient();
  const { data: user } = useAuthenticatedUser();
  const queryKey = queryKeys.getMissionActivity(id);
  const answersQueryKey = queryKeys.getQuestionAnswers(id);
  const updateMissionCompletion = useUpdateMissionCompletion(id, missionId);
  const { mutate, isLoading, isError } = useMutation(
    (data: { answer: string }) => resources.postQuestionAnswer(id, data),
    {
      onSuccess: async (_, data) => {
        updateMissionCompletion();

        // Update mission activity
        await queryClient.cancelQueries(queryKey);
        const activity = queryClient.getQueryData<
          AxiosResponse<types.ActivityResponse>
        >(queryKeys.getMissionActivity(id));

        const { answer } = data;
        if (activity && answer) {
          queryClient.setQueryData(queryKey, () => ({
            ...activity,
            data: {
              ...activity.data,
              data: {
                ...activity.data.data,
                userAnswer: {
                  files: [],
                  text: answer,
                },
              },
            },
          }));
        }

        // Update activity answers
        queryClient.setQueryData<
          AxiosResponse<types.ActivityAnswersResponse> | undefined
        >(answersQueryKey, (prevAnswers) => {
          if (!prevAnswers || !user) return prevAnswers;
          return {
            ...prevAnswers,
            data: {
              ...prevAnswers.data,
              data: [
                {
                  timeAgo: 'Now',
                  files: [],
                  answer,
                  id,
                  user: {
                    userId: user?.id,
                    fullname: `${user?.firstName} ${user?.lastName}`,
                    avatars: user?.avatars,
                  },
                },
                ...prevAnswers.data.data,
              ],
            },
          };
        });
      },
      onSettled: () => {
        // Invalidate question answers
        queryClient.invalidateQueries(answersQueryKey);
        // Invalidate mission activity
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  return { mutate, isLoading, isError };
};

export default usePostAnswerMutation;
