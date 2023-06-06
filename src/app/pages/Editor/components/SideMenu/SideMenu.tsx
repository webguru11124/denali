import { useEditor } from '@craftjs/core';
import { cx, css } from '@emotion/css';
import styled from '@emotion/styled';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { editorTypes } from 'app/router/constants';
import { selectors } from 'app/store/editor';
import {
  TextBlock,
  VideoPlay,
  AttachSquare,
  ClipboardTick,
} from 'iconsax-react';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import BlockTypes from '../../helpers/constants';

import ActionsDropdown from './components/dropdowns/actions/ActionsDropdown';
import PDFBlockDropdown from './components/dropdowns/file/PDFBlockDropdown';
import MediaBlockDropdown from './components/dropdowns/media/MediaBlockDropdown';
import TextBlockDropdown from './components/dropdowns/text/TextBlockDropdown';
import SideMenuButton from './components/SideMenuButton';

const SideMenu = () => {
  const { mode } = useParams<{ mode: string }>();
  const { t } = useArticlesTranslation();
  const languages = useSelector(selectors.getSelectedLanguages);
  const canEdit = useSelector(selectors.getCanEdit);
  const defaultIsActive =
    languages.length === 1 || languages.some((l) => l.isDefault && l.active);
  const enabled = mode !== editorTypes.review && defaultIsActive && canEdit;

  const iconClasses = !enabled ? '' : 'rounded hover:bg-gray-light';
  const size = 36;

  const { selected: selectedProps, actions } = useEditor((state) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
      };
    }

    return {
      selected,
    };
  });

  const clearSelection = () => {
    if (!selectedProps) return;

    actions.selectNode(undefined);
  };

  const disableIgnore = [
    BlockTypes.ImageBlock,
    BlockTypes.VideoBlock,
    BlockTypes.PDFBlock,
    BlockTypes.GiphyBlock,
  ];

  return (
    <>
      <StyledWrapper
        className={cx(
          'flex flex-col items-center fixed rounded-2xl py-8 right-0 w-21.5 border border-gray-light shadow-block',
          css({
            backgroundColor: !enabled ? 'rgba(255,255,255,0.4)' : '#FFFFFF',
          })
        )}
        data-tip={`${t(
          'The toolbar is only accessible from the Main language.'
        )}`}
      >
        <SideMenuButton
          first={true}
          onClick={clearSelection}
          disabled={!enabled}
        >
          <TextBlock className={iconClasses} size={size} />
          <TextBlockDropdown />
        </SideMenuButton>
        <SideMenuButton
          disabled={!enabled}
          selected={
            selectedProps?.name === BlockTypes.ImageBlock ||
            selectedProps?.name === BlockTypes.VideoBlock ||
            selectedProps?.name === BlockTypes.GiphyBlock
          }
          onClick={clearSelection}
        >
          <VideoPlay className={iconClasses} size={size} />
          <MediaBlockDropdown />
        </SideMenuButton>
        <SideMenuButton
          disabled={!enabled}
          selected={selectedProps?.name === BlockTypes.PDFBlock}
          onClick={clearSelection}
        >
          <AttachSquare className={iconClasses} size={size} />
          <PDFBlockDropdown />
        </SideMenuButton>
        <SideMenuButton
          disabled={!enabled}
          selected={selectedProps?.name === BlockTypes.ActionBlock}
          onClick={clearSelection}
        >
          <ClipboardTick className={iconClasses} size={size} />
          <ActionsDropdown />
        </SideMenuButton>
      </StyledWrapper>
      {mode !== editorTypes.review &&
        !defaultIsActive &&
        !disableIgnore.includes(selectedProps?.name ?? '') && (
          <ReactTooltip
            place="bottom"
            effect="solid"
            className="w-[220px] break-words react-tooltip"
            multiline={true}
          />
        )}
    </>
  );
};

const StyledWrapper = styled.div`
  transform: translateX(-36px);

  & > div {
    width: 100%;
  }
`;

export default memo(SideMenu);
