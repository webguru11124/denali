import config from 'app/config';
import { RelevantChannelApi } from 'submodules/common-ui/generated/api/gcs';

import { request } from '../request';
import { ChannelsRanking } from '../types';

const getRelevantChannels = (page: number, ranking: ChannelsRanking) =>
  new RelevantChannelApi(
    undefined,
    config.env.channelsApiUrl,
    request()
  ).getRelevantChannelPage(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    page,
    20,
    ranking,
    false,
    {}
  );

export { getRelevantChannels };
export default getRelevantChannels;
