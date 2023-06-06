import { useEditor } from '@craftjs/core';
import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import config from 'app/config';
import PDFBlock from 'app/pages/ArticleEditor/components/blocks/PDFBlock';
import a11yKeydown from 'app/utils/a11y/keydown';
import { Icon as IconType } from 'iconsax-react';
import { useState } from 'react';

interface PDFBlockOptionProps {
  Icon: IconType | React.ComponentType;
  GradientIcon: React.ComponentType;
  text: string;
}

const PDFBlockOption = ({ Icon, GradientIcon, text }: PDFBlockOptionProps) => {
  const [pressing, setPressing] = useState(false);

  const {
    connectors: { create },
    actions: { addNodeTree },
    query: { parseReactElement },
  } = useEditor();

  const addBlock = () => {
    const block = parseReactElement(<PDFBlock />).toNodeTree();

    addNodeTree(block, 'dropableRegion');
  };

  const pressDragClasses =
    'border-transparent bg-gradient-article1 text-grayscale-primary transform translate-0 shadow-radius-gradient cursor-grabbing';

  return (
    <StyledContainer
      ref={(ref) => ref && create(ref, <PDFBlock />)}
      className={cx(
        `w-full flex flex-col justify-center items-center rounded cursor-grab 
      bg-white text-gray-dark mt-2  py-2 border border-transparent
      hover:border-focus-background transform
    hover:bg-focus-background hover:text-grayscale-secondary
      active:border-transparent`,
        { [pressDragClasses]: pressing, 'shadow-block': !pressing }
      )}
      onClick={addBlock}
      onKeyDown={(e) => a11yKeydown(e, addBlock)}
      onMouseDown={() => setPressing(true)}
      onMouseUp={() => setPressing(false)}
      onDragStart={() => setPressing(true)}
      onDragEnd={() => setPressing(false)}
    >
      {pressing ? (
        <GradientIcon />
      ) : (
        <Icon className="w-[36px] h-[36px] text-grayscale-secondary" />
      )}
      <span className="text-grayscale-secondary">{text}</span>
      <div
        className={cx(
          'h-4.5 w-4.5 flex justify-center items-center absolute -top-1.5 -left-1.5 bg-gradient-article1 rounded-lg text-white text-xs',
          { hidden: !pressing }
        )}
      >
        +
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  &:hover {
    svg {
      color: ${config.colors['grayscale-primary']};
    }
  }
`;

export { PDFBlockOption };

export default PDFBlockOption;
