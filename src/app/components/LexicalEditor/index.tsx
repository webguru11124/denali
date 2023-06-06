import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { ListItemNode, ListNode } from '@lexical/list';
import {
  InitialEditorStateType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { editorTypes } from 'app/router/constants';
import {
  EditorState,
  LexicalEditor as LexicalEditType,
  ParagraphNode,
  SerializedEditorState,
} from 'lexical';
import { useParams } from 'react-router-dom';

import AutoFocusPlugin from './components/AutoFocus';
import TextEditor from './components/TextEditor';
import Toolbar from './components/Toolbar';
import lexicalEditorTheme from './theme';

interface LexicalEditorProps {
  toolbarVisible?: boolean;
  initialState?: InitialEditorStateType;
  type?: 'plain' | 'rich';
  onChange: (e: SerializedEditorState) => void;
  focus?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const LexicalEditor = ({
  toolbarVisible,
  initialState,
  type = 'rich',
  onChange,
  focus,
  placeholder,
  disabled = false,
}: LexicalEditorProps) => {
  const { mode } = useParams<{ mode: string }>();

  const onEditorChange = (
    state: EditorState,
    lexicalEditor: LexicalEditType
  ) => {
    lexicalEditor.update(() => {
      onChange(state.toJSON());
    });
  };

  const enabled =
    mode !== editorTypes.view && mode !== editorTypes.review && !disabled;

  return (
    <div className="relative rounded-sm">
      <LexicalComposer
        initialConfig={{
          namespace: 'editor',
          theme: lexicalEditorTheme,

          onError(error) {
            throw error;
          },
          nodes: [
            ParagraphNode,
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            TableNode,
            TableCellNode,
            TableRowNode,
          ],
          editorState: initialState,
        }}
      >
        {type === 'rich' ? <Toolbar hidden={!toolbarVisible} /> : <></>}
        {focus ? <AutoFocusPlugin /> : <></>}
        <ListPlugin />

        <TextEditor enabled={enabled} type={type} placeholder={placeholder} />
        <OnChangePlugin onChange={onEditorChange} />
      </LexicalComposer>
    </div>
  );
};
export default LexicalEditor;
