import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isAtNodeEnd } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import IconButton from 'app/components/IconButton';
import {
  SELECTION_CHANGE_COMMAND,
  $getSelection,
  $isRangeSelection,
  GridSelection,
  NodeSelection,
  RangeSelection,
  LexicalEditor,
} from 'lexical';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import PencilLineIcon from 'remixicon-react/PencilLineIcon';
import SaveLineIcon from 'remixicon-react/Save3LineIcon';

type SelectionNode = RangeSelection | NodeSelection | GridSelection | null;

interface FloatingLinkEditorProps {
  editor: LexicalEditor;
}

const FloatingLinkEditor: FC<FloatingLinkEditorProps> = ({ editor }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mouseDownRef = useRef(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState<SelectionNode>(null);

  function getSelectedNode(selection: RangeSelection) {
    const anchor = selection.anchor;
    const focus = selection.focus;
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();
    if (anchorNode === focusNode) {
      return anchorNode;
    }
    const isBackward = selection.isBackward();
    if (isBackward) {
      return $isAtNodeEnd(focus) ? anchorNode : focusNode;
    } else {
      return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
    }
  }

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl('');
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();

    if (
      selection !== null &&
      nativeSelection &&
      !nativeSelection?.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      setLastSelection(selection);
    }

    return true;
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        1
      )
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div
      ref={editorRef}
      className="absolute z-50 min-w-56 bg-light shadow-atobi  rounded-lg flex justify-between items-center pl-4 p-2"
    >
      {isEditMode ? (
        <>
          <input
            ref={inputRef}
            className="w-full outline-none"
            value={linkUrl}
            onChange={(event) => {
              setLinkUrl(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                if (lastSelection !== null) {
                  if (linkUrl !== '') {
                    editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
                  }
                  setEditMode(false);
                }
              } else if (event.key === 'Escape') {
                event.preventDefault();
                setEditMode(false);
              }
            }}
          />
          <IconButton
            Icon={SaveLineIcon}
            onClick={() => {
              setEditMode(false);
              editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
            }}
          />
        </>
      ) : (
        <>
          <a
            className="text-focus"
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkUrl}
          </a>
          <IconButton Icon={PencilLineIcon} onClick={() => setEditMode(true)} />
        </>
      )}
    </div>
  );
};

export default FloatingLinkEditor;
