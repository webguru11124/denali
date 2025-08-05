import { useFeatures } from '@paralleldrive/react-feature-toggles';
import { setRequestHeaders } from 'app/api/channels/request';
import { useDispatch, useSelector } from 'app/hooks';
import { actions } from 'app/store/channels';
import { useEffect, useState } from 'react';

import useGetRelevantChannelsQuery from './useRelevantChannelsQuery';

const useChannels = () => {
  const [enabled, setEnabled] = useState(false);
  const channels = useSelector(
    ({ channels: _channels }) => _channels.relevantChannels
  );
  const token = useSelector(({ auth }) => auth.token);
  const features = useFeatures();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token || !features.includes('channelsView')) return;
    setRequestHeaders({ token });
    setEnabled(true);
  }, [features, token]);

  const { data, isLoading } = useGetRelevantChannelsQuery({
    ranking: 'desc',
    enabled,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const channelsData =
      data?.pages?.map((page) => page.data.data).flat() ?? [];
    dispatch(actions.setRelevantChannels(channelsData));
  }, [data?.pages, dispatch]);

  return {
    channels,
    isLoading,
  };
};

export default useChannels;
