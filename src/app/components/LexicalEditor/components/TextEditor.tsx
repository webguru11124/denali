import { cx } from '@emotion/css';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { LineBreakNode } from 'lexical';
import { useEffect } from 'react';

import { SerializedLexicalState } from '../types';

interface TextEditorProps {
  enabled: boolean;
  type?: 'plain' | 'rich';
  placeholder?: string;
}

const TextEditor = ({ enabled, type, placeholder }: TextEditorProps) => {
  const [editor] = useLexicalComposerContext();

  editor.registerNodeTransform(LineBreakNode, (node) => {
    node.remove();
  });

  useEffect(() => editor.setEditable(enabled), [editor, enabled]);

  const Editor = type === 'rich' ? RichTextPlugin : PlainTextPlugin;

  const isEmpty = () => {
    const state = editor.toJSON();

    const data = state.editorState as SerializedLexicalState;

    return data.root.children[0]?.children?.[0]?.text === undefined;
  };

  return (
    <Editor
      contentEditable={
        <ContentEditable
          className={cx(
            'relative px-2 py-3 outline-none cursor-text focus-visible:bg-white rounded-lg',
            {
              'bg-grayscale-bg-dark': isEmpty(),
            }
          )}
        />
      }
      ErrorBoundary={LexicalErrorBoundary}
      placeholder={
        <span className="absolute bottom-[14px] ml-2">{placeholder ?? ''}</span>
      }
    />
  );
};

export default TextEditor;
