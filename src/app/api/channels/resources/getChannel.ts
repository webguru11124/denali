import config from 'app/config';
import { ChannelApi } from 'submodules/common-ui/generated/api/gcs';

import { request } from '../request';

const getChannel = (channelId: number) =>
  new ChannelApi(undefined, config.env.channelsApiUrl, request()).getChannel(
    channelId
  );

export { getChannel };
export default getChannel;
