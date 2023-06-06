import { selectData } from 'app/utils';
import { useQuery } from 'react-query';

import { NotificationFilter } from '../constants';
import queryKeys from '../queryKeys';
import { getNotifications } from '../resources';

const REQUEST_INTERVAL = 60000;

const useNotificationsQuery = (
  filter: NotificationFilter,
  enabled: boolean
) => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getNotifications(filter),
    () => getNotifications(filter),
    {
      enabled,
      refetchOnWindowFocus: false,
      refetchInterval: REQUEST_INTERVAL,
    }
  );

  return { data: selectData(data), isLoading, isError };
};

export default useNotificationsQuery;
