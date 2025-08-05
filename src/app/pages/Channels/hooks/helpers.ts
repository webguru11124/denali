import { SerializedNode } from '@craftjs/core';
import { ComponentProps } from 'react';
import { BasicChannelInfo } from 'submodules/common-ui/generated/api/gcs';

import ChannelItem from '../components/ChannelItem';
import EmptyChannels from '../components/EmptyChannels';
import NewChannelItem from '../components/NewChannelItem';

type ExtendedSerializedNode = SerializedNode & {
  id: string;
  position: number;
};

const getSerializedChannelBlock = (
  channel: BasicChannelInfo
): Record<string, ExtendedSerializedNode> => {
  const props: ComponentProps<typeof ChannelItem> = {
    data: channel,
  };

  return {
    [String(channel.id)]: {
      parent: 'dropableRegion',
      id: String(channel.id),
      position: channel.ranking,
      type: { resolvedName: 'ChannelItem' },
      displayName: 'ChannelItem',
      hidden: false,
      isCanvas: false,
      nodes: [],
      linkedNodes: {},
      props: props,
    },
  };
};

const getSerializedChannelHeaderBlock = (): Record<
  string,
  ExtendedSerializedNode
> => {
  const props: ComponentProps<typeof NewChannelItem> = {};
  return {
    ['newChannel']: {
      parent: 'staticBlock',
      id: 'newChannel',
      position: 0,
      type: { resolvedName: 'NewChannelItem' },
      displayName: 'NewChannelItem',
      hidden: false,
      isCanvas: false,
      nodes: [],
      linkedNodes: {},
      props,
    },
  };
};

const getSerializedEmptyChannelsBlock = (): Record<
  string,
  ExtendedSerializedNode
> => {
  const props: ComponentProps<typeof EmptyChannels> = {};
  return {
    ['emptyChannels']: {
      parent: 'staticBlock',
      id: 'emptyChannels',
      position: 0,
      type: { resolvedName: 'EmptyChannels' },
      displayName: 'EmptyChannels',
      hidden: false,
      isCanvas: false,
      nodes: [],
      linkedNodes: {},
      props,
    },
  };
};

const getSerializedParseObject = ({
  name,
  parent,
  props = {},
}: {
  name: string;
  parent: string;
  props?: any;
}): SerializedNode => {
  return {
    displayName: name,
    hidden: false,
    isCanvas: false,
    linkedNodes: {},
    nodes: [],
    parent: parent,
    props,
    type: {
      resolvedName: name,
    },
  };
};

export {
  getSerializedChannelBlock,
  getSerializedChannelHeaderBlock,
  getSerializedParseObject,
  getSerializedEmptyChannelsBlock,
};
