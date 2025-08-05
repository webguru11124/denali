import { useEditor, useNode } from '@craftjs/core';
import { editorTypes } from 'app/router/constants';
import { selectors } from 'app/store/editor';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BaseBlockContainer from '../BaseBlockContainer';

interface TitleBlockProps {
  text?: string;
}

const TitleBlock = ({ text = '' }: TitleBlockProps) => {
  const { mode } = useParams<{ mode: string }>();
  const canEdit = useSelector(selectors.getCanEdit);
  const {
    id,
    connectors: { connect },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const {
    actions: { selectNode },
  } = useEditor();

  useEffect(() => {
    selectNode(id);
  }, [selectNode, id]);

  const enabled =
    mode !== editorTypes.view && mode !== editorTypes.review && canEdit;

  return (
    <div ref={(ref) => ref && connect(ref)} className="px-2">
      <BaseBlockContainer
        selected={selected}
        deleteOnBackspace={false}
        type={'Title'}
        canDrag={false}
        deletable={false}
      >
        <input
          className="w-full relative px-2 py-3 outline-none cursor-text focus-visible:bg-white rounded-lg text-3xl placeholder-gray-dark font-lato disabled:bg-white"
          type="text"
          placeholder="Untitled"
          value={text ?? null}
          disabled={!enabled}
          onChange={(e) => {
            setProp((props: TitleBlockProps) => {
              props.text = e.target.value;
            });
          }}
        />
      </BaseBlockContainer>
    </div>
  );
};

TitleBlock.craft = {
  rules: {
    canDrag: () => false,
  },
};

export { TitleBlock };
export default TitleBlock;
