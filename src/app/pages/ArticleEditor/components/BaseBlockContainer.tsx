import { useEditor, useNode } from '@craftjs/core';
import { css, cx } from '@emotion/css';
import BlockDeletedToast from 'app/pages/Editor/components/Toast/BlockDeletedToast';
import { editorTypes } from 'app/router/constants';
import { selectors } from 'app/store/editor';
import CloseGradient from 'assets/icons/cross-gradient.svg';
import { Add } from 'iconsax-react';
import { KeyboardEvent, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import DragHandle from './DragHandle';

interface BaseBlockContainerProps {
  selected: boolean;
  children: ReactNode;
  type: 'Image' | 'GIF' | 'PDF' | 'Video' | 'Text' | 'Url' | 'Title' | 'Task';
  nodeId?: string;
  deleteOnBackspace?: boolean;
  deletable?: boolean;
  canDrag?: boolean;
  hasError?: boolean;
}

const BaseBlockContainer = ({
  selected,
  nodeId,
  type,
  children,
  deleteOnBackspace = true,
  deletable = true,
  canDrag = true,
  hasError = false,
}: BaseBlockContainerProps) => {
  const { mode } = useParams<{ mode: string }>();
  const selectedLanguages = useSelector(selectors.getSelectedLanguages);
  const canEdit = useSelector(selectors.getCanEdit);

  const isMainIsActive = selectedLanguages.some(
    (sl) => sl.isDefault && sl.active
  );

  const { actions, currentQuery } = useEditor((state, query) => ({
    currentQuery: query,
  }));

  const {
    connectors: { drag },
  } = useNode();

  const { undo } = actions.history;

  const deleteNode = () => {
    if (!nodeId) return;

    actions.delete(nodeId);

    toast.dismiss();

    toast(<BlockDeletedToast onClick={undo} type={type} />, {
      position: 'bottom-center',
      autoClose: 8000,
      closeButton: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      containerId: 'DeletedBlockPopup',
    });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Backspace' && selected && deleteOnBackspace) {
      deleteNode();
    }
  };

  const moveBlock = (to: 'up' | 'down') => {
    const nodes = currentQuery.getNodes().dropableRegion.data.nodes;

    const currentRegion = nodes.findIndex((node) => node === nodeId);

    if (currentRegion !== -1) {
      if (to === 'up') {
        if (currentRegion === 0) return;
        actions.move(String(nodeId), 'dropableRegion', currentRegion - 1);
      } else {
        const indexToMove =
          currentRegion > nodes.length - 1 ? currentRegion : currentRegion + 1;
        const nodeToMove = nodes[indexToMove];
        actions.move(nodeToMove, 'dropableRegion', indexToMove - 1);
      }
    }
  };

  const enabled =
    canEdit && mode !== editorTypes.review && mode !== editorTypes.view;

  const showDragHandle = enabled && canDrag && isMainIsActive && !hasError;

  const showBorder = selected && !hasError && enabled;

  return (
    <div
      className={cx(
        'border border-transparent rounded-lg relative ',
        {
          'bg-gradient-block bg-origin-border': showBorder,
          'mt-4': type !== 'Title',
        },
        css(selected && 'background-clip: content-box, border-box')
      )}
      role="button"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {deletable && isMainIsActive && enabled && (
        <button
          className={cx(
            'h-8 w-8 flex justify-center items-center absolute -top-3 -right-3 rounded bg-white shadow-atobi text-focus',
            { hidden: !selected && !hasError }
          )}
          onClick={() => deleteNode()}
        >
          {hasError && (
            <Add size={30} className="rotate-45 text-grayscale-secondary" />
          )}
          {!hasError && <img src={CloseGradient} alt="Delete Block" />}
        </button>
      )}
      {showDragHandle && (
        <DragHandle drag={drag} moveBlock={moveBlock} selected={selected} />
      )}
      {children}
    </div>
  );
};

export default BaseBlockContainer;
