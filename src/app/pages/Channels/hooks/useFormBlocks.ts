import { SerializedNode } from '@craftjs/core';
import {
  dropableRegionBlock,
  rootBlock,
  staticBlock,
} from 'app/utils/createCraftBlocks';
import { AxiosResponse } from 'axios';
import sortBy from 'lodash/sortBy';
import { useMemo } from 'react';
import { InfiniteData } from 'react-query';
import { ChannelPage } from 'submodules/common-ui/generated/api/gcs';

import {
  getSerializedChannelBlock,
  getSerializedChannelHeaderBlock,
  getSerializedEmptyChannelsBlock,
} from './helpers';

const useFormBlocks = (
  data: InfiniteData<AxiosResponse<ChannelPage, any>> | undefined | undefined
) => {
  const blocks = useMemo(() => {
    const channels = data?.pages?.map((page) => page.data.data).flat() ?? [];
    const userBlocks = channels.reduce<
      Record<string, SerializedNode & { id: string; position: number }>
    >(
      (accumulator, block) => ({
        ...accumulator,
        ...getSerializedChannelBlock(block),
      }),
      {}
    );

    const nodes = userBlocks
      ? sortBy(
          Object.values(userBlocks).filter((block) => block),
          (o) => o.position
        )
          .map((o) => o.id)
          .reverse()
      : undefined;

    const content = {
      ROOT: rootBlock(),
      ...getSerializedChannelHeaderBlock(),
      dropableRegion: dropableRegionBlock(nodes),
      ...userBlocks,
    };

    if (channels.length === 0) {
      return {
        ...content,
        staticBlock: staticBlock(['newChannel', 'emptyChannels']),
        ...getSerializedEmptyChannelsBlock(),
      };
    }

    return {
      ...content,
      staticBlock: staticBlock(['newChannel']),
    };
  }, [data]);

  const length = useMemo(() => {
    const channels = data?.pages?.map((page) => page.data.data).flat() ?? [];
    return channels.length ?? 0;
  }, [data?.pages]);

  return {
    blocks,
    length,
  };
};

export default useFormBlocks;
