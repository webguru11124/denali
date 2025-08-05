import { useEditor, useNode } from '@craftjs/core';

import BaseBlockContainer from '../BaseBlockContainer';

interface UrlBlockProps {
  name?: string;
  url: string;
  openIn: 'current-window' | 'new-window';
}

const UrlBlock = ({ name, url, openIn }: UrlBlockProps) => {
  const {
    connectors: { connect },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const { currentNodeId: nodeId } = useEditor((state) => {
    const [currentNodeId] = state.events.selected;

    return {
      currentNodeId,
    };
  });

  return (
    <div ref={(ref) => ref && connect(ref)}>
      <BaseBlockContainer selected={selected} nodeId={nodeId} type={'Url'}>
        <a
          className="ml-5 text-xl underline"
          href={url}
          target={openIn === 'new-window' ? '_blank' : '_self'}
          rel="noopener noreferrer"
        >
          {name ?? url}
        </a>
      </BaseBlockContainer>
    </div>
  );
};

export { UrlBlock };
export default UrlBlock;
