import { useEditor } from '@craftjs/core';
import { cx } from '@emotion/css';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import SimpleTask from 'app/pages/ArticleEditor/components/blocks/SimpleTask';
import a11yKeydown from 'app/utils/a11y/keydown';
import MediaTaskPreview from 'assets/images/media-task.png';
import SimpleTaskPreview from 'assets/images/simple-task.png';
import { Icon as IconType } from 'iconsax-react';
import { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import {
  MediaTaskBlockTypeEnum,
  SimpleTaskBlockTypeEnum,
} from 'submodules/common-ui/generated/api/gcs';

interface ActionBlockProps {
  text: string;
  Icon: IconType;
  type: MediaTaskBlockTypeEnum | SimpleTaskBlockTypeEnum;
}

const ActionBlockOption = ({ text, Icon, type }: ActionBlockProps) => {
  const { t } = useArticlesTranslation();

  const [pressing, setPressing] = useState(false);
  const {
    connectors: { create },
    actions: { addNodeTree },
    query: { parseReactElement },
  } = useEditor();

  const addBlock = () => {
    const block = parseReactElement(
      <SimpleTask type={type} required={-1} isPublic={true} audiences={[]} />
    ).toNodeTree();

    addNodeTree(block, 'dropableRegion');
  };

  const pressDragClasses =
    'cursor-grabbing bg-gradient-article1 transform translate-0 shadow-radius-gradient';

  return (
    <div
      data-tip
      data-for={type}
      role="button"
      ref={(ref) =>
        ref &&
        create(
          ref,
          <SimpleTask
            type={type}
            required={-1}
            isPublic={true}
            audiences={[]}
          />
        )
      }
      tabIndex={0}
      onClick={addBlock}
      onKeyDown={(e) => a11yKeydown(e, addBlock)}
      onMouseDown={() => setPressing(true)}
      onMouseUp={() => setPressing(false)}
      onDragStart={() => setPressing(true)}
      onDragEnd={() => setPressing(false)}
      className={cx(
        `flex w-full items-center border border-transparent rounded mt-3 h-8.5 
        text-grayscale-secondary hover bg-white hover:bg-focus-background
        hover:text-black cursor-grab`,
        { [pressDragClasses]: pressing, 'shadow-block': !pressing }
      )}
    >
      <Icon className="ml-3 mr-[6px]" size={16} />
      <span className="text-sm text-grayscale-secondary">{text}</span>
      <div
        className={cx(
          'h-4.5 w-4.5 flex justify-center items-center absolute -top-1.5 -left-1.5 bg-gradient-article1 rounded-lg text-white text-xs',
          { hidden: !pressing }
        )}
      >
        +
      </div>
      <ReactTooltip
        place="right"
        effect="solid"
        class="whitespace-pre-wrap !rounded !opacity-100"
        id={type}
        padding="0px"
      >
        <div className="flex flex-col w-[148px] p-2">
          <img
            src={type === 'media_task' ? MediaTaskPreview : SimpleTaskPreview}
            alt="Help"
            className="h-auto"
          />
          <span className="text-white text-[10px] mt-2 text-start">
            {type === 'media_task'
              ? t('Get visual confirmation of how it looks')
              : t('Confirm and track if something is done')}
          </span>
        </div>
      </ReactTooltip>
    </div>
  );
};

export default ActionBlockOption;
