import { ClassNames } from '@emotion/react';
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isHeadingNode } from '@lexical/rich-text';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { useState, useCallback, useEffect, useRef, FC } from 'react';
import { createPortal } from 'react-dom';
import ArrowDropDownLineIcon from 'remixicon-react/ArrowDropDownLineIcon';
import BoldIcon from 'remixicon-react/BoldIcon';
import ItalicIcon from 'remixicon-react/ItalicIcon';
import ListOrderedIcon from 'remixicon-react/ListOrderedIcon';
import ListUnorderedIcon from 'remixicon-react/ListUnorderedIcon';
import UnderlineIcon from 'remixicon-react/UnderlineIcon';

import {
  blockTypeToBlockName,
  EditorBlockName,
  ListFormat,
  TextFormat,
} from '../types';

import DropdownOptions from './DropdownOptions';
import ToolbarIcon from './ToolbarIcon';
interface ToolbarProps {
  hidden?: boolean;
}

const Toolbar: FC<ToolbarProps> = ({ hidden }) => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [blockType, setBlockType] = useState<EditorBlockName>('paragraph');
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] =
    useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type: EditorBlockName = ($isHeadingNode(
            element
          ) as unknown as EditorBlockName)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
        }
      }

      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  }, [editor]);

  const formatBulletList = () => {
    if (blockType !== 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatOrderedList = () => {
    if (blockType !== 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      })
    );
  }, [updateToolbar, editor]);

  const LIST_FORMATS: ListFormat[] = [
    {
      id: 1,
      icon: <ListUnorderedIcon size={20} />,
      onClick: formatBulletList,
      active: blockType === 'ul',
    },
    {
      id: 2,
      icon: <ListOrderedIcon size={20} />,
      onClick: formatOrderedList,
      active: blockType === 'ol',
    },
  ];

  const TEXT_FORMATS: TextFormat[] = [
    {
      id: 1,
      type: 'bold',
      icon: <BoldIcon size={20} />,
      active: isBold,
    },
    {
      id: 2,
      type: 'italic',
      icon: <ItalicIcon size={20} />,
      active: isItalic,
    },
    {
      id: 3,
      type: 'underline',
      icon: <UnderlineIcon size={20} />,
      active: isUnderline,
    },
  ];

  return (
    <ClassNames>
      {({ cx }) => (
        <div
          ref={toolbarRef}
          className={cx(
            'inline-flex gap-2 relative rounded-lg shadow-atobi py-1 px-3 items-center',
            { hidden }
          )}
        >
          <button
            className="flex  items-center hover:bg-gray-light pl-2 rounded-sm min-w-30 justify-between"
            onClick={() =>
              setShowBlockOptionsDropDown(!showBlockOptionsDropDown)
            }
          >
            <span className="text">{blockTypeToBlockName[blockType]}</span>

            <ArrowDropDownLineIcon size={30} />
          </button>
          <span className="bg-black opacity-30 h-6" style={{ width: 1 }} />
          {LIST_FORMATS.map((format) => (
            <ToolbarIcon
              key={format.id}
              onClick={format.onClick}
              active={format.active}
            >
              {format.icon}
            </ToolbarIcon>
          ))}
          <span className="bg-black opacity-30 h-6" style={{ width: 1 }} />
          {TEXT_FORMATS.map((format) => (
            <ToolbarIcon
              key={format.id}
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, format.type);
              }}
              active={format.active}
            >
              {format.icon}
            </ToolbarIcon>
          ))}

          {showBlockOptionsDropDown &&
            toolbarRef.current &&
            createPortal(
              <DropdownOptions
                editor={editor}
                blockType={blockType}
                toolbarRef={toolbarRef}
                setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
              />,
              toolbarRef.current
            )}
        </div>
      )}
    </ClassNames>
  );
};

export default Toolbar;
