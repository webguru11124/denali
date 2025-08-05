import { resources, queryKeys, constants } from 'app/api/notifications';
import { useMutation, useQueryClient } from 'react-query';

const useMarkAllAsReadMutation = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, data } = useMutation(
    resources.markAllAsRead,
    {
      onSettled: async () => {
        // Refetch notifications
        queryClient.invalidateQueries(
          queryKeys.getNotifications(constants.NotificationFilter.all)
        );

        queryClient.invalidateQueries(
          queryKeys.getNotifications(constants.NotificationFilter.unread)
        );
      },
    }
  );

  return { mutate, isLoading, isError, data };
};

export default useMarkAllAsReadMutation;
