import { resources, queryKeys } from 'app/api/notifications';
import { NotificationFilter } from 'app/api/notifications/constants';
import { NotificationsResponse } from 'app/api/notifications/types';
import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const updateNotifications = (
  prevNotifications: AxiosResponse<NotificationsResponse>,
  idsToUpdate: Array<number>
) => ({
  ...prevNotifications,
  data: {
    ...prevNotifications.data,
    data: prevNotifications?.data.data.map((notification) => {
      if (!idsToUpdate.includes(notification.id)) return notification;

      return {
        ...notification,
        read: true,
      };
    }),
  },
});

const filterNotifications = (
  prevNotifications: AxiosResponse<NotificationsResponse>,
  idsToUpdate: Array<number>
) => ({
  ...prevNotifications,
  data: {
    ...prevNotifications.data,
    data: prevNotifications?.data.data.filter(
      ({ id }) => !idsToUpdate.includes(id)
    ),
  },
});

const useMarkAsReadMutation = () => {
  const queryClient = useQueryClient();
  const queryKeyUnread = queryKeys.getNotifications(NotificationFilter.unread);
  const queryKeyAll = queryKeys.getNotifications(NotificationFilter.all);
  const { mutate, isLoading, isError, data } = useMutation(
    (ids: Array<number>) => resources.markAsRead(ids),
    {
      onMutate: async (ids: Array<number>) => {
        await queryClient.cancelQueries(queryKeyAll);
        await queryClient.cancelQueries(queryKeyUnread);

        queryClient.setQueryData<
          AxiosResponse<NotificationsResponse> | undefined
        >(queryKeyAll, (prevNotifications) => {
          if (!prevNotifications) return undefined;
          return updateNotifications(prevNotifications, ids);
        });

        queryClient.setQueryData<
          AxiosResponse<NotificationsResponse> | undefined
        >(queryKeyUnread, (prevNotifications) => {
          if (!prevNotifications) return undefined;

          // Remove read notifications
          return filterNotifications(prevNotifications, ids);
        });
      },

      onSettled: async () => {
        // Refetch notifications
        queryClient.invalidateQueries(queryKeyAll);

        queryClient.invalidateQueries(queryKeyUnread);
      },
    }
  );

  return { mutate, isLoading, isError, data };
};

export default useMarkAsReadMutation;
