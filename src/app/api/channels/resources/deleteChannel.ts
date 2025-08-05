import config from 'app/config';
import { ChannelApi } from 'submodules/common-ui/generated/api/gcs';

import { request } from '../request';

const deleteChannel = (channelId: number) =>
  new ChannelApi(undefined, config.env.channelsApiUrl, request()).deleteChannel(
    channelId
  );

export default deleteChannel;
