import config from 'app/config';
import {
  ChannelApi,
  UpdatedChannel,
} from 'submodules/common-ui/generated/api/gcs';

import { request } from '../request';

const updateChannel = (updatedChannel: UpdatedChannel) =>
  new ChannelApi(undefined, config.env.channelsApiUrl, request()).updateChannel(
    undefined,
    updatedChannel
  );

export default updateChannel;
