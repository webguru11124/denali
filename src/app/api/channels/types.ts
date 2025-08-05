import {
  BasicChannelInfo,
  CoverImageChannelFileGet,
  CoverImageChannelInternalFileGet,
} from 'submodules/common-ui/generated/api/gcs';

export type ChannelsRanking = 'asc' | 'desc';

export interface NewChannelInfo extends BasicChannelInfo {
  coverImage: ChannelCoverImage;
}

export type ChannelCoverImage =
  | (CoverImageChannelInternalFileGet & { file?: File })
  | (CoverImageChannelFileGet & { file?: File })
  | null;
