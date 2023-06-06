import { useEditor } from '@craftjs/core';
import { Input } from 'app/components';
import { useEffect, useState } from 'react';
import SearchLineIcon from 'remixicon-react/SearchLineIcon';
import { useDebounce } from 'use-debounce';

import { getSerializedParseObject } from '../hooks/helpers';

const SearchContainer = () => {
  const [value, setValue] = useState('');
  const [wasSearched, setWasSearched] = useState(false);
  const [debouncedValue] = useDebounce(value, 500);

  const {
    query: { parseSerializedNode },
    store: {
      actions: { setHidden, add, delete: deleteNode, selectNode },
    },
    getNodes,
  } = useEditor((_, query) => ({ getNodes: query.getNodes }));

  useEffect(() => {
    const dropableNodes = getNodes().dropableRegion?.data?.nodes ?? [];

    if (debouncedValue.length >= 3) {
      setWasSearched(true);
      const nodes = getNodes();
      const listInvisibleNodes = [];
      for (let i = 0; i < dropableNodes.length; i++) {
        const node = nodes[dropableNodes[i]];
        const nodeData = node.data.props.data;
        const defaultLang = Object.keys(nodeData.title).find(
          (e) => nodeData.title[e].isDefault
        );
        if (!defaultLang) return;
        const nodeTitle = nodeData.title[defaultLang].title.toLowerCase();
        listInvisibleNodes.push({
          isVisible: nodeTitle.includes(debouncedValue),
          id: node.id,
        });
      }

      for (const eachNode of listInvisibleNodes) {
        setHidden(eachNode.id, !eachNode.isVisible);
      }

      const visibleNodesLength = listInvisibleNodes.filter(
        (e) => e.isVisible
      ).length;

      const emptyBlockId = Object.keys(nodes).find(
        (node) => nodes[node].data.name === 'EmptyChannels'
      );

      if (visibleNodesLength === 0) {
        if (!emptyBlockId) {
          const serializedNode = getSerializedParseObject({
            name: 'EmptyChannels',
            parent: 'staticBlock',
          });
          const node = parseSerializedNode(serializedNode).toNode();
          add(node, 'staticBlock');
        }
      } else {
        if (emptyBlockId) deleteNode(emptyBlockId);
      }
    } else {
      if (wasSearched && dropableNodes.length > 0) {
        setWasSearched(false);
        const nodes = getNodes();
        const emptyBlockId = Object.keys(nodes).find(
          (node) => nodes[node].data.name === 'EmptyChannels'
        );
        if (emptyBlockId) deleteNode(emptyBlockId);
        for (const eachNode of dropableNodes) {
          setHidden(eachNode, false);
        }
      }
    }
  }, [
    add,
    debouncedValue,
    deleteNode,
    getNodes,
    parseSerializedNode,
    setHidden,
    wasSearched,
  ]);

  return (
    <div className="flex gap-4">
      <div className="border-[1px] border-gray-light rounded-lg grow">
        <Input
          height={30}
          name="search"
          placeholder="Search for Channel"
          icon={<SearchLineIcon size={24} />}
          onChange={(e) => setValue(e.target.value.toLowerCase())}
        />
      </div>
    </div>
  );
};

export default SearchContainer;
