import { SerializedNode } from '@craftjs/core';
import { HTMLAttributes } from 'react';

export type ExtendedSerializedNode = SerializedNode & {
  id: string;
  position: number;
};
const rootBlock = (
  props: HTMLAttributes<HTMLDivElement> = {}
): ExtendedSerializedNode => {
  return {
    id: 'ROOT',
    position: 0,
    displayName: 'div',
    hidden: false,
    isCanvas: false,
    nodes: ['staticBlock', 'dropableRegion'],
    linkedNodes: {},
    props,
    parent: '',
    type: 'div',
  };
};

const dropableRegionBlock = (
  nodes?: string[],
  props: HTMLAttributes<HTMLDivElement> = {}
): ExtendedSerializedNode => {
  return {
    position: 0,
    id: 'dropableRegion',
    displayName: 'div',
    hidden: false,
    isCanvas: true,
    nodes: nodes || [],
    linkedNodes: {},
    props,
    parent: 'ROOT',
    type: 'div',
  };
};

const staticBlock = (nodes: string[] = []): ExtendedSerializedNode => {
  return {
    position: 0,
    id: 'staticBlock',
    displayName: 'div',
    hidden: false,
    isCanvas: false,
    nodes,
    linkedNodes: {},
    props: {},
    parent: 'ROOT',
    type: 'div',
  };
};

export { rootBlock, staticBlock, dropableRegionBlock };
