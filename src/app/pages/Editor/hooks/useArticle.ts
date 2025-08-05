import { Node } from '@craftjs/core/lib/interfaces/nodes';
import { actions, selectors } from 'app/store/editor';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Article,
  NewArticleStatusEnum,
  UpdatedArticleStatusEnum,
} from 'submodules/common-ui/generated/api/gcs';

import useCreateArticleMutation from './mutations/useCreateArticleMutation';
import useUpdateArticleMutation from './mutations/useUpdateArticleMutation';
import useMapNewArticle from './useMapNewArticle';
import useMapUpdateArticle from './useMapUpdateArticle';

interface Props {
  article?: Article;
  nodes: Record<string, Node>;
}

export interface ArticleState {
  state?:
    | 'created'
    | 'updated'
    | 'published'
    | 'createdPublished'
    | 'error'
    | 'scheduled'
    | 'createdScheduled'
    | 'scheduleCanceled';
  result?: Article;
}

const useArticle = ({ article, nodes }: Props) => {
  const publishDate = useSelector(selectors.getPublishDate);
  const archiveDate = useSelector(selectors.getArchiveDate);

  const dispatch = useDispatch();

  const {
    mutate: createArticle,
    isLoading: isCreatingArticle,
    isError: createError,
  } = useCreateArticleMutation();
  const {
    mutate: updateArticle,
    isLoading: isUpdatingArticle,
    isError: updateError,
  } = useUpdateArticleMutation();

  const { nodesToNewArticle } = useMapNewArticle(nodes);
  const { nodesToUpdateArticle } = useMapUpdateArticle();

  const [articleState, setArticleState] = useState<ArticleState>({
    state: undefined,
  });

  const getArticlePublishParams = <T>(
    hasSchedule?: boolean
  ): {
    status: T;
    publishAt: string | null;
    archiveAt: string | null;
  } => {
    if (!hasSchedule) {
      return {
        status: 'published' as T,
        publishAt: dayjs().toISOString(),
        archiveAt: null,
      };
    }

    return {
      status: 'published' as T,
      publishAt: publishDate ?? null,
      archiveAt: archiveDate ?? null,
    };
  };

  const saveNewArticle = ({
    isPublish = false,
    isSchedule = false,
  }: {
    isPublish?: boolean;
    isSchedule?: boolean;
  }) => {
    const newArticle = nodesToNewArticle();

    if (isPublish || isSchedule) {
      const { archiveAt, publishAt, status } =
        getArticlePublishParams<NewArticleStatusEnum>(isSchedule);

      newArticle.archiveAt = archiveAt;
      newArticle.publishAt = publishAt;
      newArticle.status = status;
    }

    createArticle(
      { article: newArticle },
      {
        onSuccess: (res) =>
          setArticleState({
            state: isPublish
              ? 'createdPublished'
              : isSchedule
              ? 'createdScheduled'
              : 'created',
            result: res,
          }),
        onError: (err) =>
          setArticleState({
            state: 'error',
          }),
      }
    );
  };

  const saveArticle = () => {
    if (!article) return;

    const updatedArticle = nodesToUpdateArticle(article, nodes);
    updateArticle(
      {
        article: updatedArticle,
      },
      {
        onSuccess: (res) => setArticleState({ state: 'updated' }),
        onError: (err) =>
          setArticleState({
            state: 'error',
          }),
      }
    );
  };

  const publishArticle = () => {
    if (!article) {
      saveNewArticle({ isPublish: true });
      return;
    }

    const updatedArticle = nodesToUpdateArticle(article, nodes);

    if (article.status === 'published' && dayjs() > dayjs(article.publishAt)) {
      updatedArticle.archiveAt = null;
      updatedArticle.publishAt = dayjs().toISOString();
    } else {
      const { archiveAt, publishAt, status } =
        getArticlePublishParams<UpdatedArticleStatusEnum>();

      updatedArticle.archiveAt = archiveAt;
      updatedArticle.publishAt = publishAt;
      updatedArticle.status = status;
    }

    updateArticle(
      {
        article: updatedArticle,
      },
      {
        onSuccess: (res) => setArticleState({ state: 'published' }),
      }
    );
  };

  const scheduleArticle = () => {
    if (!article) {
      saveNewArticle({ isSchedule: true });
      return;
    }

    const updatedArticle = nodesToUpdateArticle(article, nodes);
    const { archiveAt, publishAt, status } =
      getArticlePublishParams<UpdatedArticleStatusEnum>(true);

    updatedArticle.archiveAt = archiveAt;
    updatedArticle.publishAt = publishAt;
    updatedArticle.status = status;

    updateArticle(
      {
        article: updatedArticle,
      },
      {
        onSuccess: (res) => setArticleState({ state: 'scheduled' }),
      }
    );
  };

  const cancelArticleSchedule = () => {
    dispatch(actions.setArchiveDate(undefined));
    dispatch(actions.setPublishDate(undefined));

    if (!article) {
      setArticleState({ state: 'scheduleCanceled' });
      return;
    }

    const updatedArticle = nodesToUpdateArticle(article, nodes);

    updatedArticle.archiveAt = null;
    updatedArticle.publishAt = null;
    updatedArticle.status = 'draft';

    updateArticle(
      {
        article: updatedArticle,
      },
      {
        onSuccess: (res) => setArticleState({ state: 'scheduleCanceled' }),
      }
    );
  };

  return {
    saveArticle,
    saveNewArticle,
    publishArticle,
    scheduleArticle,
    cancelArticleSchedule,
    articleState,
    isCreatingArticle,
    isUpdatingArticle,
  };
};

export default useArticle;
