import config from 'app/config';
import { ChannelApi } from 'submodules/common-ui/generated/api/gcs';

import { request } from '../request';
import { ChannelsRanking } from '../types';

const getChannels = (page: number, ranking: ChannelsRanking) =>
  new ChannelApi(
    undefined,
    config.env.channelsApiUrl,
    request()
  ).getChannelPage(page, 20, ranking);

export { getChannels };
export default getChannels;
