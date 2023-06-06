import config from 'app/config';
import { ChannelApi, NewChannel } from 'submodules/common-ui/generated/api/gcs';

import { request } from '../request';

const createChannel = (newChannel: NewChannel) =>
  new ChannelApi(
    undefined,
    config.env.channelsApiUrl,
    request()
  ).createNewChannel(undefined, newChannel);

export default createChannel;
