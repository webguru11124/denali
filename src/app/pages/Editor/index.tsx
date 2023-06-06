import { Editor as CraftEditor } from '@craftjs/core';
import useGetArticleCollaboratorsQuery from 'app/api/articleCollaborators/hooks/useGetArticleCollaboratorsQuery';
import useArticle from 'app/api/articles/hooks/useArticle';
import useGetAudiencesQuery from 'app/api/audiences/hooks/useAudiencesQuery';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { PageLoader } from 'app/components';
import config from 'app/config';
import { useDispatch, useISOLanguages } from 'app/hooks';
import { routes } from 'app/router';
import { editorTypes } from 'app/router/constants';
import { actions as editorActions, actions, selectors } from 'app/store/editor';
import { Audience, Collaborator, Language } from 'app/store/editor/types';
import { actions as naviagtionActions } from 'app/store/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import CoverImageBlock from '../ArticleEditor/components/blocks/CoverImageBlock';
import GiphyBlock from '../ArticleEditor/components/blocks/GiphyBlock';
import ImageBlock from '../ArticleEditor/components/blocks/ImageBlock';
import PDFBlock from '../ArticleEditor/components/blocks/PDFBlock';
import SimpleTask from '../ArticleEditor/components/blocks/SimpleTask';
import TextBlock from '../ArticleEditor/components/blocks/TextBlock';
import TitleBlock from '../ArticleEditor/components/blocks/TitleBlock';
import UrlBlock from '../ArticleEditor/components/blocks/UrlBlock';
import VideoBlock from '../ArticleEditor/components/blocks/VideoBlock';

import ErrorContainer from './components/ErrorContainer/ErrorContainer';
import ModalHandler from './components/ModalHandler';
import Editor from './Editor';

const EditorContextWrapper = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(naviagtionActions.setFullPage(true));

    return () => {
      dispatch(naviagtionActions.setFullPage(false));
      dispatch(editorActions.stateReset());
    };
  }, [dispatch]);

  const { id: articleId, mode } = useParams<{ id?: string; mode: string }>();
  const canEdit = useSelector(selectors.getCanEdit);
  const enabled = canEdit && (mode === editorTypes.edit || !articleId);

  const {
    article,
    isLoading: isLoadingArticle,
    apiError,
  } = useArticle({
    id: Number(articleId),
    enabled: articleId !== undefined,
  });

  const { data: collaborators, isLoading: isLoadingCollaborators } =
    useGetArticleCollaboratorsQuery({
      role: 'collaborators',
      permissions: 'update',
    });
  const { data: audiences, isLoading: isLoadingAudiences } =
    useGetAudiencesQuery({
      page: 1,
      query: '',
    });
  const languages = useISOLanguages({ search: '' });
  const { data: user } = useAuthenticatedUser();

  const setArticleLanguages = () => {
    if (!article) return;

    const stateLanguages: Language[] = [];
    languages.forEach((l) => {
      article.languages.forEach((l2) => {
        if (l.code === l2.language) {
          stateLanguages.push({
            name: l.name,
            code: l.code,
            isDefault: l2.isDefault,
            active: user?.contentLanguage.uiLanguage === l.code,
          });
        }
      });
    });
    dispatch(actions.updateLanguages(stateLanguages));
  };

  const setArticleCollaborators = () => {
    if (!collaborators || !article) return;

    const stateCollaborators: Collaborator[] = [];
    collaborators.forEach((c) => {
      article.users.forEach((u) => {
        if (c.id === u.id) {
          stateCollaborators.push({
            id: c.id,
            avatar: c.avatars.small,
            fullName: c.fullName,
            languages: u.languages,
            email: c.email,
          });
        }
      });
    });

    dispatch(editorActions.updateCollaborators(stateCollaborators));
  };

  const setArticleAudiences = () => {
    if (!article || !audiences) return;

    const stateAudiences: Audience[] = [];
    audiences.forEach((a) => {
      article.audiences?.forEach((id) => {
        if (a.id === id) {
          stateAudiences.push({
            id: a.id,
            name: a.name,
            members: a.usersCount ?? 0,
          });
        }
      });
    });

    dispatch(editorActions.updateAudiences(stateAudiences));
  };

  const setDefaultUserAndLanguage = () => {
    if (articleId || !user) return;

    dispatch(
      editorActions.addLanguage({
        name: user.contentLanguage.uiLanguage,
        code: user.contentLanguage.uiLanguage,
        isDefault: true,
        active: true,
      })
    );
    dispatch(
      editorActions.addCollaborator({
        id: user.id,
        fullName: `${user.name} ${user.lastName}`,
        avatar: user.avatars.small,
        languages: [user.contentLanguage.uiLanguage],
        email: user.email,
      })
    );
  };

  useEffect(() => {
    if (!articleId && user) {
      setDefaultUserAndLanguage();
      return;
    }

    if (collaborators) setArticleCollaborators();
    if (audiences) setArticleAudiences();

    setArticleLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId, article, user, collaborators, audiences]);

  useEffect(() => {
    if (
      article &&
      article.status === 'inbound' &&
      mode !== editorTypes.review
    ) {
      history.replace(
        routes.editorArticle.create(article.id.toString(), editorTypes.review)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article]);

  if (isLoadingArticle || isLoadingAudiences || isLoadingCollaborators) {
    return <PageLoader />;
  }

  if (apiError) return <ErrorContainer error={apiError} />;

  return (
    <div className="w-full flex flex-col items-center bg-gradient-article2">
      <CraftEditor
        enabled={enabled}
        resolver={{
          ImageBlock,
          VideoBlock,
          GiphyBlock,
          TextBlock,
          CoverImageBlock,
          TitleBlock,
          UrlBlock,
          PDFBlock,
          SimpleTask,
        }}
        indicator={{ success: config.colors.focus, error: config.colors.error }}
      >
        <Editor article={article} />
        <ModalHandler />
      </CraftEditor>
    </div>
  );
};

export default EditorContextWrapper;
