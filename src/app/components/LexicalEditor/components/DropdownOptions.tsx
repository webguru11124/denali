import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text';
import { $wrapNodes } from '@lexical/selection';
import {
  LexicalEditor,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
} from 'lexical';
import { FC, RefObject, useEffect, useRef } from 'react';

import { EditorBlockName } from '../types';

interface DropdownOptionsProps {
  editor: LexicalEditor;
  blockType: EditorBlockName;
  toolbarRef: RefObject<HTMLDivElement>;
  setShowBlockOptionsDropDown: (value: boolean) => void;
}

const DropdownOptions: FC<DropdownOptionsProps> = ({
  editor,
  blockType,
  toolbarRef,
  setShowBlockOptionsDropDown,
}) => {
  const dropDownRef = useRef<HTMLDivElement>(null);

  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatTilte = (title: HeadingTagType) => {
    if (blockType !== title) {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode(title));
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  useEffect(() => {
    const dropDown = dropDownRef.current;
    const toolbar = toolbarRef.current;

    if (dropDown !== null && toolbar !== null) {
      const handle = (event: MouseEvent) => {
        const target = event.target as Node;
        if (!dropDown.contains(target) && !toolbar.contains(target)) {
          setShowBlockOptionsDropDown(false);
        }
      };
      document.addEventListener('click', handle);

      return () => {
        document.removeEventListener('click', handle);
      };
    }
  }, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef]);

  return (
    <div
      className="flex flex-col absolute bg-white z-10 gap-1 p-2 shadow-atobi rounded-lg top-10 left-0"
      ref={dropDownRef}
    >
      <button
        className="flex justify-start pr-16 items-center p-2 hover:bg-gray-light pl-2  shadow-atobi rounded-lg h-12"
        onClick={() => formatTilte('h1')}
      >
        <span className="p-0 m-0 text-xl">Heading</span>
        {blockType === 'h1' && <span className="active" />}
      </button>
      <button
        className="flex justify-start pr-16 items-center p-2 hover:bg-gray-light pl-2  shadow-atobi rounded-lg h-12"
        onClick={() => formatTilte('h2')}
      >
        <span className="p-0 m-0 text-lg">Subheading</span>
        {blockType === 'quote' && <span className="active" />}
      </button>
      <button
        className="flex justify-start pr-16 items-center p-2 hover:bg-gray-light pl-2  shadow-atobi rounded-lg h-12"
        onClick={formatParagraph}
      >
        <span className="p-0 m-0 text-base">Body</span>
        {blockType === 'paragraph' && <span className="active" />}
      </button>
    </div>
  );
};

export default DropdownOptions;
