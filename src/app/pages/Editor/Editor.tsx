import { Frame, useEditor, Node } from '@craftjs/core';
import { cx } from '@emotion/css';
import { logEventArticle } from 'app/api/articles/resources';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import BeforeLeaveModal from 'app/components/BeforeLeaveModal';
import { useSelector } from 'app/hooks';
import useRouteBlock, { Action, Location } from 'app/hooks/useRouteBlock';
import {
  useArticlesTranslation,
  useCommonTranslation,
} from 'app/internationalization/hooks';
import { routes } from 'app/router';
import { editorTypes } from 'app/router/constants';
import { actions, selectors } from 'app/store/editor';
import { actions as modalActions } from 'app/store/modal';
import { ModalTypes } from 'app/store/modal/types';
import { ReactComponent as Spinner } from 'assets/icons/spinner.svg';
import dayjs from 'dayjs';
import { Danger, TickCircle } from 'iconsax-react';
import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback, useMemo } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Article } from 'submodules/common-ui/generated/api/gcs';

import ChannelModal from './components/ChannelModal/ChannelModal';
import PublishModal from './components/PublishModal/PublishModal';
import ReviewPopUp from './components/ReviewPopUp';
import SaveBeforeLanguageChangeModal from './components/SaveBeforeLanguageChangeModal';
import { ScheduleModalProps } from './components/ScheduleModal';
import SharedCommentPopup from './components/SharedCommentPopUp';
import SideMenu from './components/SideMenu/SideMenu';
import SimpleToast from './components/Toast/SimpleToast';
import SimpleToastContainer from './components/Toast/SimpleToastContainer';
import ToastContainer from './components/Toast/ToastContainer';
import TopBar from './components/TopBar/TopBar';
import useArticle from './hooks/useArticle';
import useArticleBlocks from './hooks/useArticleBlocks';
import useCurrentArticleLanguage from './hooks/useCurrentArticleLanguage';

interface EditorProps {
  article: Article | undefined;
}

const Editor = ({ article }: EditorProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { mode } = useParams<{ mode: string }>();

  const { t } = useArticlesTranslation();
  const { t: ct } = useCommonTranslation();

  const { data: user } = useAuthenticatedUser();

  const {
    nodes,
    store: {
      actions: { deserialize, selectNode },
    },
  } = useEditor((state, query) => ({
    nodes: query.getNodes(),
  }));

  const [initialNodes, setInitialNodes] = useState<Record<string, Node>>({});
  const [beforeLeaveModalOpen, setBeforeLeaveModalOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [channelModalOpen, setChannelModalOpen] = useState(false);
  const [beforeLanguageModal, setBeforeLanguageModal] = useState(false);
  const [saveToastText, setSaveToastText] = useState(
    location?.state?.toastText
  );
  const [currentId, setCurrentId] = useState<number>();

  const selectedCollaborators = useSelector(selectors.getSelecteCollaborators);
  const selectedLanguages = useSelector(selectors.getSelectedLanguages);
  const language = useSelector(selectors.getActiveLanguage);
  const mainLanguage = selectedLanguages.find((l) => l.isDefault)?.code ?? 'en';
  const currentLanguageCode = useCurrentArticleLanguage();

  const publishDate = useSelector(selectors.getPublishDate);

  const selectedChannel = useSelector(selectors.getSelectedChannel);

  const userLanguages = useMemo(
    () =>
      selectedCollaborators.filter((sc) => sc.id === user?.id)[0]?.languages ??
      [],
    [selectedCollaborators, user?.id]
  );

  const { blocks } = useArticleBlocks(mainLanguage, article);
  const {
    articleState,
    publishArticle,
    saveArticle,
    saveNewArticle,
    scheduleArticle,
    cancelArticleSchedule,
    isCreatingArticle,
    isUpdatingArticle,
  } = useArticle({ article, nodes });

  const setEditorContent = useCallback(() => {
    if (!blocks) return;

    deserialize(blocks);
  }, [blocks, deserialize]);

  useEffect(() => {
    if (!article) return;

    dispatch(actions.setCanEdit(userLanguages.includes(language)));
  }, [userLanguages, language, article, dispatch]);

  useEffect(() => {
    setEditorContent();
  }, [setEditorContent]);

  useEffect(() => {
    setInitialNodes({});
  }, [language]);

  useEffect(() => {
    setInitialNodes((prev) => {
      if (prev && Object.keys(prev).length > 0) {
        return prev;
      }

      return nodes;
    });
  }, [nodes]);

  useEffect(() => {
    const articleId = article?.id;
    dispatch(actions.setCurrentArticleId(articleId));
  }, [dispatch, article]);

  useEffect(() => {
    if (article?.id && !currentId) setCurrentId(article.id);
  }, [article?.id, currentId]);

  useEffect(() => {
    if (currentId) logEventArticle(currentId);
  }, [currentId]);

  useEffect(() => {
    dispatch(actions.addChannel(article?.channel ?? null));
  }, [article?.channel, dispatch]);

  useEffect(() => {
    if (!saveToastText) return;

    articleSavedToast(saveToastText, <TickCircle className={iconClass} />);
  }, [saveToastText]);

  useEffect(() => {
    if (!articleState.state) return;

    switch (articleState.state) {
      case 'created':
        onArticleCreated();
        break;
      case 'createdPublished':
        onArticleCreated(true);
        break;
      case 'updated':
        onArticleUpdated();
        break;
      case 'published':
        onArticlePublished();
        break;
      case 'scheduled':
        onArticleScheduled();
        break;
      case 'createdScheduled':
        onArticleScheduled(true);
        break;
      case 'scheduleCanceled':
        articleSavedToast(
          'Your schedule has been canceled',
          <TickCircle size={20} className={iconClass} />
        );
        break;
      case 'error':
        articleSavedToast(
          t('Error. Failed to save article'),
          <Danger className={iconClass} />
        );
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleState]);

  const onBlock = (loc: Location, action: Action) => {
    if (hasUnsavedChanges()) {
      setBeforeLeaveModalOpen(true);
      return false;
    }
    return true;
  };

  const hasUnsavedVariant = (): boolean => {
    if (coverImage === null || title === null) return true;

    if (article && article.blocks.some((block) => !block.variants[language])) {
      return true;
    }

    return hasUnsavedChanges();
  };

  const hasUnsavedChanges = (): boolean => {
    const normalizedInitialNodes = Object.keys(initialNodes).map((e) => {
      return {
        data: initialNodes[e].data.props,
      };
    });

    const normalizedNodes = Object.keys(nodes).map((e) => {
      return {
        data: nodes[e].data.props,
      };
    });

    return !isEqual(normalizedInitialNodes, normalizedNodes);
  };

  const { unblock } = useRouteBlock({ onBlock });

  const onLeave = (): void => {
    unblock();
    history.replace(routes.articleStudio.create());
  };

  const onSavePress = () => {
    if (coverImage === null || title === null) return;

    selectNode(undefined);

    articleSavedToast(
      ct('Saving...'),
      <Spinner className={cx(iconClass, 'animate-spin')} />
    );

    if (article) {
      saveArticle();
      return;
    }

    saveNewArticle({ isPublish: false });
  };

  const articleSavedToast = (text: string, icon: JSX.Element) => {
    toast.dismiss();

    toast(<SimpleToast text={text} Icon={icon} />, {
      position: 'bottom-center',
      autoClose: 8000,
      closeButton: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      containerId: 'Simple',
    });
  };

  const onLanguageLeave = () => {
    if (!currentLanguageCode) return;

    if (currentLanguageCode === mainLanguage) {
      setBeforeLanguageModal(false);
      return;
    }

    dispatch(
      actions.updateCollaboratorLanguages({
        code: currentLanguageCode,
        id: article?.createdBy ?? user?.id ?? 0,
      })
    );
    dispatch(actions.removeLanguage(currentLanguageCode));
    dispatch(actions.setActiveLanguage(mainLanguage));

    setBeforeLanguageModal(false);
  };

  const onArticleCreated = (isPublish?: boolean) => {
    if (!articleState?.result?.id) return;

    setBeforeLeaveModalOpen(false);
    setBeforeLanguageModal(false);

    unblock();

    if (isPublish) {
      dispatch(
        modalActions.showModal({
          modalType: ModalTypes.SUCCESS_MODAL,
          modalProps: {
            title: t('Success!'),
            description: t('Your article is Published'),
          },
        })
      );
    }

    history.replace({
      pathname: routes.editorArticle.create(
        articleState.result.id.toString(),
        'edit'
      ),
      state: {
        ...(!isPublish && { toastText: t('Article Saved') }),
      },
    });
  };

  const onArticleUpdated = () => {
    setBeforeLeaveModalOpen(false);
    setBeforeLanguageModal(false);
    articleSavedToast(
      t('Your article is updated'),
      <TickCircle size={20} className={iconClass} />
    );
    setInitialNodes({});
  };

  const onArticlePublished = () => {
    setPublishModalOpen(false);
    setInitialNodes({});
    dispatch(
      modalActions.showModal({
        modalType: ModalTypes.SUCCESS_MODAL,
        modalProps: {
          title: t('Success!'),
          description: t('Your article is Published'),
        },
      })
    );
  };

  const onPublishClick = () => {
    if (selectedChannel) return setPublishModalOpen(true);
    setChannelModalOpen(true);
  };

  const onArticleScheduled = (isCreate?: boolean) => {
    setPublishModalOpen(false);
    setInitialNodes({});

    const text = `${t('Your article is scheduled to publish on')} ${dayjs(
      publishDate
    ).format('MMM D YYYY')}`;

    dispatch(actions.setArchiveDate(undefined));
    dispatch(actions.setPublishDate(undefined));

    if (isCreate && articleState?.result?.id) {
      history.replace({
        pathname: routes.editorArticle.create(
          articleState.result.id.toString(),
          'edit'
        ),
        state: {
          toastText: text,
        },
      });
      return;
    }

    articleSavedToast(text, <TickCircle size={20} className={iconClass} />);
  };

  const openScheduleModal = () => {
    dispatch(
      modalActions.showModal({
        modalType: ModalTypes.SCHEDULE_MODAL,
        modalProps: { article } as ScheduleModalProps,
      })
    );
  };

  const iconClass = 'h-5 w-5 mr-2.5 text-white';

  const coverImage = nodes['coverImage']?.data.props.imageSchema || null;
  const title = nodes['title']?.data.props.text || null;

  return (
    <>
      {mode !== editorTypes.view && (
        <TopBar
          article={article}
          articleOwner={article?.createdBy ?? user?.id}
          updatedAt={article?.updatedAt}
          onSaveClick={onSavePress}
          onPublishClick={onPublishClick}
          beforeLanguageChange={
            hasUnsavedVariant() ? () => setBeforeLanguageModal(true) : undefined
          }
        />
      )}

      <div className="flex justify-center w-full mt-[144px] relative">
        <OutsideClickHandler onOutsideClick={() => selectNode(undefined)}>
          <div className="flex">
            <div className="bg-white flex flex-col w-[792px] min-h-[550px] rounded-lg shadow-atobi mb-[50px]">
              <Frame />
            </div>
            {mode !== editorTypes.view && <SideMenu />}
          </div>
        </OutsideClickHandler>
      </div>

      {article && (
        <>
          {article.sharingComment && <SharedCommentPopup article={article} />}
          {article.status === 'inbound' && (
            <ReviewPopUp article={article} userId={user?.id} />
          )}
        </>
      )}

      {beforeLeaveModalOpen && (
        <BeforeLeaveModal
          onLeaveClick={onLeave}
          onSaveClick={onSavePress}
          isSaving={isCreatingArticle}
          saveDisabled={coverImage === null || title === null}
          onClose={() => setBeforeLeaveModalOpen(false)}
        />
      )}

      {beforeLanguageModal && (
        <SaveBeforeLanguageChangeModal
          onLeaveClick={onLanguageLeave}
          onSaveClick={onSavePress}
          isSaving={isCreatingArticle || isUpdatingArticle}
          saveDisabled={coverImage === null || title === null}
          onClose={() => setBeforeLanguageModal(false)}
        />
      )}

      {channelModalOpen && (
        <ChannelModal
          canPublish={true}
          setPublishModalOpen={setPublishModalOpen}
          setChannelModalOpen={setChannelModalOpen}
        />
      )}

      {publishModalOpen && (
        <PublishModal
          publish={() => {
            if (coverImage === null || title === null) return;
            selectNode(undefined);
            publishArticle();
          }}
          schedule={() => {
            if (coverImage === null || title === null) return;
            selectNode(undefined);
            scheduleArticle();
          }}
          articleArchiveDate={article?.archiveAt}
          articlePublishDate={article?.publishAt}
          cancelSchedule={() => cancelArticleSchedule()}
          submitDisabled={coverImage === null || title === null}
          toggleScheduleModal={openScheduleModal}
          isLoading={isCreatingArticle || isUpdatingArticle}
          onClose={() => setPublishModalOpen(false)}
        />
      )}

      <ToastContainer toastId="DeletedBlockPopup" />
      <ToastContainer toastId="Languages" />
      <SimpleToastContainer toastId="Simple" />
    </>
  );
};

export default Editor;
