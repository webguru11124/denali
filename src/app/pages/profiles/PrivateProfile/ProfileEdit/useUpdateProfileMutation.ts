import { resources, queryKeys, types } from 'app/api/auth';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const authenticatedUserContext = queryKeys.authenticatedUser();
  const { data, isLoading, isError, mutate } = useMutation(
    resources.updateProfile,
    {
      onMutate: async ({
        first_name: firstName,
        last_name: lastName,
        phone,
        translation_language: translationLanguage
      }) => {
        await queryClient.cancelQueries(authenticatedUserContext);
        const currentUserData = queryClient.getQueryData<
          AxiosResponse<types.UserProfileResponse>
        >(authenticatedUserContext);

        if (currentUserData) {
          queryClient.setQueriesData(authenticatedUserContext, {
            ...currentUserData,
            data: {
              ...currentUserData.data,

              data: {
                ...currentUserData.data.data,
                name: `${firstName} ${lastName}`,
                firstName,
                lastName,
                phone,
                translationLanguage
              },
            },
          });
        }
      },

      onSettled: () => {
        queryClient.invalidateQueries(authenticatedUserContext);
      },
    }
  );

  return { data, isLoading, isError, update: mutate };
};

export default useUpdateProfileMutation;
