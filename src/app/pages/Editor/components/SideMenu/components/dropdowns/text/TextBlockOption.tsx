import { useEditor } from '@craftjs/core';
import { cx } from '@emotion/css';
import TextBlock from 'app/pages/ArticleEditor/components/blocks/TextBlock';
import { InitialType } from 'app/pages/ArticleEditor/helpers/generateInitialState';
import a11yKeydown from 'app/utils/a11y/keydown';
import { useState } from 'react';
interface OptionButtonProps {
  className: string;
  text: string;
  type: InitialType;
}

const TextBlockOption = ({ className, text, type }: OptionButtonProps) => {
  const [pressing, setPressing] = useState(false);
  const {
    connectors: { create },
    actions: { addNodeTree },
    query: { parseReactElement },
  } = useEditor();

  const addBlock = () => {
    const block = parseReactElement(
      <TextBlock initialType={type} />
    ).toNodeTree();

    addNodeTree(block, 'dropableRegion');
  };

  const pressDragClasses =
    'cursor-grabbing bg-gradient-article1 transform translate-0 shadow-radius-gradient';
  return (
    <div
      role="button"
      ref={(ref) => ref && create(ref, <TextBlock initialType={type} />)}
      tabIndex={0}
      onClick={addBlock}
      onKeyDown={(e) => a11yKeydown(e, addBlock)}
      onMouseDown={() => setPressing(true)}
      onMouseUp={() => setPressing(false)}
      onDragStart={() => setPressing(true)}
      onDragEnd={() => setPressing(false)}
      className={cx(
        'flex w-full justify-center items-center border border-transparent rounded mt-2 h-8.5 bg-white hover:bg-focus-background cursor-grab',
        { [pressDragClasses]: pressing, 'shadow-block': !pressing }
      )}
    >
      <span className={`${className} text-grayscale-secondary`}>{text}</span>
      <div
        className={cx(
          'h-4.5 w-4.5 flex justify-center items-center absolute -top-1.5 -left-1.5 bg-gradient-article1 rounded-lg text-white text-xs',
          { hidden: !pressing }
        )}
      >
        +
      </div>
    </div>
  );
};

export default TextBlockOption;
