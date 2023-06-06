import {
  BasicChannelInfo,
  BasicRelevantChannelInfo,
} from 'submodules/common-ui/generated/api/gcs';
export interface State {
  channels: BasicChannelInfo[];
  relevantChannels: BasicRelevantChannelInfo[];
}
