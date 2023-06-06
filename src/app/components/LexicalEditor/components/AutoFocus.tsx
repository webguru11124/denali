import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React from 'react';

const AutoFocusPlugin = () => {
  const [editor] = useLexicalComposerContext();
  React.useEffect(() => {
    editor.focus();
  }, [editor]);
  return <></>;
};

export default AutoFocusPlugin;
