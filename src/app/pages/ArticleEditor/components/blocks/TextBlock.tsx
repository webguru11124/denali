import { useEditor, useNode } from '@craftjs/core';
import LexicalEditor from 'app/components/LexicalEditor';
import apiToEditor from 'app/pages/ArticleEditor/helpers/apiToEditor';
import editorToApi from 'app/pages/ArticleEditor/helpers/editorToApi';
import { editorTypes } from 'app/router/constants';
import { selectors } from 'app/store/editor';
import { TextBlockVariant } from 'common-ui/generated/api/gcs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import generateInitialState, {
  InitialType,
} from '../../helpers/generateInitialState';
import BaseBlockContainer from '../BaseBlockContainer';

interface TextBlockProps {
  nodes?: TextBlockVariant;
  initialType?: InitialType;
}

const TextBlock = ({ nodes, initialType }: TextBlockProps) => {
  const { mode } = useParams<{ mode: string }>();
  const [initialState, setInitialState] = useState('');
  const [isDeletable, setIsDeletable] = useState(false);
  const canEdit = useSelector(selectors.getCanEdit);

  const {
    id,
    selected,
    connectors: { connect },
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const {
    currentNodeId: nodeId,
    actions: { selectNode },
  } = useEditor((state) => {
    const [currentNodeId] = state.events.selected;

    return {
      currentNodeId,
    };
  });

  useEffect(() => {
    if (!canEdit) return;

    selectNode(id);
  }, [canEdit, id, selectNode]);

  useEffect(() => {
    if (nodes) {
      const parsedToEditor = apiToEditor(nodes);
      const initialStateString = JSON.stringify(parsedToEditor);
      setInitialState(initialStateString);
    } else {
      const initialLexicalState = generateInitialState(initialType);
      setInitialState(initialLexicalState);
    }
  }, [initialType, nodes]);

  useEffect(() => {
    if (nodes && nodes.items[0].children[0]) setIsDeletable(false);
    else setIsDeletable(true);
  }, [nodes]);

  const enabled =
    canEdit && mode !== editorTypes.review && mode !== editorTypes.view;

  return (
    <div ref={(ref) => ref && connect(ref)}>
      <BaseBlockContainer
        selected={selected}
        nodeId={nodeId}
        type={'Text'}
        deleteOnBackspace={isDeletable}
      >
        {initialState && (
          <LexicalEditor
            initialState={initialState}
            toolbarVisible={selected && enabled}
            focus={!!initialType}
            disabled={!enabled}
            onChange={(state) => {
              setProp((props: TextBlockProps) => {
                props.nodes = editorToApi(state.root.children);
              });
            }}
          />
        )}
      </BaseBlockContainer>
    </div>
  );
};

export { TextBlock };
export default TextBlock;
