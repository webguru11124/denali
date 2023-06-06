import { useEditor } from '@craftjs/core';
import { cx } from '@emotion/css';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import {
  useArticlesTranslation,
  useCommonTranslation,
} from 'app/internationalization/hooks';
import { editorTypes } from 'app/router/constants';
import { selectors } from 'app/store/editor';
import { actions as modalActions } from 'app/store/modal';
import { ModalTypes } from 'app/store/modal/types';
import { ReactComponent as CloudSave } from 'assets/icons/cloud-save.svg';
import dayjs from 'dayjs';
import { ArrowForward, ArrowLeft2, Back } from 'iconsax-react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import TimeLineIcon from 'remixicon-react/TimeLineIcon';
import { Article } from 'submodules/common-ui/generated/api/gcs';

import useCurrentArticleLanguage from '../../hooks/useCurrentArticleLanguage';
import getChannelTitle from '../../utils/getChannelTitle';
import ChannelTag from '../ChannelTag';

import DropdownButton from './DropdownButton';
import LanguageDropdown from './LanguageDropdown';
import PublishDropdown from './PublishDropdown';

interface TopBarProps {
  article?: Article;
  articleOwner?: number | null;
  updatedAt?: string | null;
  onSaveClick: VoidFunction;
  onPublishClick: VoidFunction;
  beforeLanguageChange?: VoidFunction;
}

const TopBar = ({
  article,
  articleOwner,
  updatedAt,
  onSaveClick,
  onPublishClick,
  beforeLanguageChange,
}: TopBarProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { mode } = useParams<{ mode: string }>();
  const { t } = useArticlesTranslation();
  const { t: ct } = useCommonTranslation();
  const { data: user } = useAuthenticatedUser();
  const currentLanguageCode = useCurrentArticleLanguage();

  const selectedChannel = useSelector(selectors.getSelectedChannel);

  const {
    title: articleTitle,
    actions,
    canRedo,
    canUndo,
  } = useEditor((state, query) => ({
    title: state?.nodes?.title?.data?.props?.text,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  const { undo, redo } = actions.history;

  if (history.location?.state?.published) {
    dispatch(
      modalActions.showModal({
        modalType: ModalTypes.SUCCESS_MODAL,
        modalProps: {
          title: 'Congratulations!',
          description: 'Your article is published.',
        },
      })
    );
  }

  const onAddChannel = () => {
    dispatch(
      modalActions.showModal({
        modalType: ModalTypes.ADD_CHANNEL_MODAL,
        modalProps: {},
      })
    );
  };

  const disabled = mode === editorTypes.review;

  return (
    <div className="flex w-full px-6 py-3 h-18 bg-white fixed z-10">
      <div className="flex flex-1 justify-start">
        <div className="flex border-r border-gray-light">
          <button onClick={history.goBack}>
            <ArrowLeft2 />
          </button>
          <div className="flex flex-col items-start justify-between ml-6 mr-4">
            <span className="block text-sm max-w-34 overflow-hidden text-ellipsis whitespace-nowrap">
              {articleTitle?.length ? articleTitle : t('Untitled')}
            </span>

            <div className="flex items-center">
              <button onClick={() => onAddChannel()}>
                <ChannelTag>
                  {selectedChannel
                    ? getChannelTitle(selectedChannel)
                    : 'Add Channel'}
                </ChannelTag>
              </button>

              {updatedAt && (
                <>
                  <div className="rounded bg-gray-dark w-[3px] h-[3px] mx-2" />
                  <div className="flex items-center justify-center text-grayscale-secondary">
                    <TimeLineIcon className="h-4 w-4" />
                    <span className="block ml-1 text-xs max-w-34 overflow-hidden text-ellipsis whitespace-nowrap">
                      {ct('Updated')} {dayjs(updatedAt).format('DD MMM YYYY')}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex border-r border-gray-light">
          <DropdownButton
            buttonText={'Languages'}
            tooltipText={t('Switch and manage languages')}
            text={currentLanguageCode}
            disabled={disabled}
          >
            <LanguageDropdown
              userId={user?.id}
              articleOwner={articleOwner ?? 0}
              selectedLanguageCode={currentLanguageCode}
              beforeLanguageChange={beforeLanguageChange}
              onLanguageSettingsClick={() =>
                dispatch(
                  modalActions.showModal({
                    modalType: ModalTypes.LANGUAGES_MODAL,
                    modalProps: { articleOwner },
                  })
                )
              }
            />
          </DropdownButton>
        </div>

        <div className="flex items-center text-gray-dark">
          <button onClick={undo} disabled={!canUndo || disabled}>
            <Back
              className={cx('ml-3', {
                'text-grayscale-secondary': canUndo && !disabled,
              })}
            />
          </button>
          <button onClick={redo} disabled={!canRedo || disabled}>
            <ArrowForward
              className={cx('ml-2', {
                'text-grayscale-secondary': canRedo && !disabled,
              })}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-1 justify-end items-center">
        <button
          className={cx(
            'flex justify-center items-center h-10 rounded-xl w-[160px] text-sm border-transparent',
            {
              'bg-hover-blue hover:bg-focus-background text-focus': !disabled,
              'bg-grayscale-bg-dark text-grayscale-secondary': disabled,
            }
          )}
          onClick={() => onSaveClick()}
          disabled={disabled}
        >
          <CloudSave className="mr-2" />
          <span className="text-sm">
            {article && article.status === 'published'
              ? t('Update')
              : t('Save Article')}
          </span>
        </button>
        <PublishDropdown
          disabled={articleOwner !== user?.id || disabled}
          onPublishClick={onPublishClick}
          onShareClick={
            article?.id
              ? () =>
                  dispatch(
                    modalActions.showModal({
                      modalType: ModalTypes.FORWARD_MODAL,
                      modalProps: { articleOwner, articleId: article.id },
                    })
                  )
              : undefined
          }
          addCollaboratorClick={() =>
            dispatch(
              modalActions.showModal({
                modalType: ModalTypes.COLLABORATORS_MODAL,
                modalProps: { articleOwner, articleId: article?.id },
              })
            )
          }
          onScheduleClick={() =>
            dispatch(
              modalActions.showModal({
                modalType: ModalTypes.SCHEDULE_MODAL,
                modalProps: { article },
              })
            )
          }
        />
      </div>
    </div>
  );
};

export default TopBar;
