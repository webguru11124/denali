import { useEditor, useNode } from '@craftjs/core';
import { cx } from '@emotion/css';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { editorTypes } from 'app/router/constants';
import { selectors } from 'app/store/editor';
import { ChangeEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  MediaTaskBlockTypeEnum,
  SimpleTaskBlockCategoryEnum,
  SimpleTaskBlockTypeEnum,
} from 'submodules/common-ui/generated/api/gcs';

import BaseBlockContainer from '../../BaseBlockContainer';

import CategoryDropDown from './Category/CategoryDropdown';
import Completion from './Completion';
import Deadline from './Deadline';
import Privacy from './Privacy';
import TaskType from './TaskType';

interface SimpleTaskProps {
  category?: SimpleTaskBlockCategoryEnum2;
  deadline?: string;
  description?: string;
  required: number;
  isPublic: boolean;
  audiences: number[];
  type: MediaTaskBlockTypeEnum | SimpleTaskBlockTypeEnum;
}

export const SimpleTaskBlockCategoryEnum2 = {
  NoCategory: 'No Category',
  ...SimpleTaskBlockCategoryEnum,
} as const;

export type SimpleTaskBlockCategoryEnum2 =
  (typeof SimpleTaskBlockCategoryEnum2)[keyof typeof SimpleTaskBlockCategoryEnum2];

const SimpleTask = ({
  category,
  deadline,
  description,
  audiences,
  required,
  isPublic,
  type,
}: SimpleTaskProps) => {
  const { mode } = useParams<{ mode: string }>();
  const { t } = useArticlesTranslation();

  const canEdit = useSelector(selectors.getCanEdit);

  const {
    id,
    selected,
    connectors: { connect },
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const {
    currentNodeId: nodeId,
    actions: { selectNode },
  } = useEditor((state) => {
    const [currentNodeId] = state.events.selected;

    return {
      currentNodeId,
    };
  });

  const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const minHeight = 20;
    const maxHeight = 40;

    e.target.style.height = `${minHeight}px`;

    if (e.target.scrollHeight <= maxHeight) {
      e.target.style.height = `${e.target.scrollHeight}px`;
      setProp((props: SimpleTaskProps) => {
        props.description = e.target.value;
      });
      return;
    }

    if (e.target.scrollHeight > maxHeight) {
      e.target.style.height = `${maxHeight}px`;
      e.preventDefault();
      return;
    }
  };

  useEffect(() => selectNode(id), [selectNode, id]);

  const enabled =
    canEdit && mode !== editorTypes.view && mode !== editorTypes.review;

  return (
    <div ref={(ref) => ref && connect(ref)}>
      <BaseBlockContainer
        selected={selected}
        nodeId={nodeId}
        type={'Task'}
        deleteOnBackspace={!description}
      >
        <div className="flex justify-between m-2 p-3 rounded border border-gray-light shadow-action">
          <div className="flex flex-col w-full">
            <div className="flex items-center">
              <TaskType
                type={type}
                disabled={!enabled}
                onClick={(value) =>
                  setProp((props: SimpleTaskProps) => {
                    props.type = value;
                  })
                }
              />
              <textarea
                rows={1}
                value={description ?? ''}
                className="text-sm text-black placeholder-grayscale-secondary w-full mr-4 resize-none overflow-hidden disabled:bg-white"
                placeholder={`${t('Type here...')}`}
                disabled={!enabled}
                onChange={onDescriptionChange}
              />
            </div>
            <div
              className={cx('flex text-gray-dark mt-2.5', {
                hidden: !selected && !deadline && !category,
              })}
            >
              {(selected || (!selected && deadline)) && (
                <Deadline
                  selected={deadline}
                  disabled={!enabled}
                  onChange={(value) =>
                    setProp((props: SimpleTaskProps) => {
                      props.deadline = value ?? undefined;
                    })
                  }
                />
              )}
              {(selected || (!selected && category)) && (
                <CategoryDropDown
                  selected={category}
                  disabled={!enabled}
                  onClick={(value) =>
                    setProp((props: SimpleTaskProps) => {
                      props.category = value;
                    })
                  }
                />
              )}
              {category && (
                <span className="text-xs text-grayscale-secondary ml-1">
                  {category}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-end justify-center ml-auto text-gray-dark">
            <Privacy
              isPublic={isPublic}
              disabled={!enabled}
              onClick={(value) => {
                setProp((props: SimpleTaskProps) => {
                  props.isPublic = value;
                });
              }}
            />
            <div className="bg-gray-dark h-5 w-[1px]" />
            <Completion
              required={required}
              disabled={!enabled}
              onClick={(value) => {
                setProp((props: SimpleTaskProps) => {
                  props.required = value;
                });
              }}
            />
          </div>
        </div>
      </BaseBlockContainer>
    </div>
  );
};
export default SimpleTask;
