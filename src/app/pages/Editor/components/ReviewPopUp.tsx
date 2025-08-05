import { cx } from '@emotion/css';
import useGetArticlesQuery from 'app/api/articles/hooks/useArticles';
import { Button, PageLoader } from 'app/components';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { routes } from 'app/router';
import dayjs from 'dayjs';
import { Danger, SmsTracking } from 'iconsax-react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Article,
  UpdatedArticle,
  UpdatedArticleStatusEnum,
} from 'submodules/common-ui/generated/api/gcs/api';

import useUpdateArticleMutation from '../hooks/mutations/useUpdateArticleMutation';

import SimpleToast from './Toast/SimpleToast';
import UndoToast from './Toast/UndoToast';

interface ReviewPopUpProps {
  article: Article;
  userId?: number;
}

const ReviewPopUp = ({ article, userId }: ReviewPopUpProps) => {
  const history = useHistory();

  const { mutate: updateArticle, isLoading } = useUpdateArticleMutation();

  const { refetch } = useGetArticlesQuery({
    page: 0,
    filters: {
      status: 'inbound',
    },
  });

  const { t } = useArticlesTranslation();

  const updatedArticle = (status: UpdatedArticleStatusEnum): UpdatedArticle => {
    return {
      ...article,
      publishAt: article.publishAt,
      archiveAt: article.archiveAt ?? null,
      channelId: article.channel?.id ?? null,
      status: status,
      ...(userId &&
        status === 'draft' && {
          users: [
            { id: userId, languages: article.languages.map((l) => l.language) },
          ],
        }),
    };
  };

  const cancelReject = () => {
    if (!article) return;

    updateArticle(
      { article: updatedArticle('inbound') },
      {
        onSuccess: (res) => refetch(),
      }
    );
  };

  const approveArticle = () => {
    if (!article) return;

    updateArticle(
      { article: updatedArticle('draft') },
      {
        onSuccess: (res) => {
          history.replace(
            routes.editorArticle.create(article.id.toString(), 'edit')
          );
          toast(
            <SimpleToast
              text={t('Article approved and moved to your Draft tab')}
            />,
            {
              position: 'bottom-center',
              autoClose: 8000,
              closeButton: false,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              containerId: 'Simple',
            }
          );
        },
      }
    );
  };

  const rejectArticle = () => {
    if (!article) return;

    updateArticle(
      { article: updatedArticle('rejected') },
      {
        onSuccess: (res) => {
          toast(
            <UndoToast
              text={t('Article was rejected and removed')}
              icon={<span className="text-lg2">🚨</span>}
              onClick={cancelReject}
            />,
            {
              position: 'bottom-center',
              autoClose: 8000,
              closeButton: false,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              containerId: 'ArticleRejection',
            }
          );
          history.replace(routes.articleStudio.create());
        },
      }
    );
  };

  return (
    <div className="flex flex-col p-4 bg-white rounded-2xl max-w-[392px] fixed bottom-0 right-0 mr-6 mb-6">
      <div className="flex flex-col text-center">
        <span className="text-lg font-bold">👋 {t('Review Article')}</span>
        <span className="mt-6 font-bold">
          {t('This article is in review mode.')}
        </span>
        <span className="text-sm mt-1">
          <strong>{t('Approve')}</strong>{' '}
          {t('to unlock editing and publishing.')}
        </span>
        <span className="text-sm">
          <strong>{t('Reject')}</strong> {t('to remove from Inbox.')}
        </span>
        <div className="flex items-center justify-center text-[10px] text-grayscale-secondary mt-1">
          <Danger size={12} className="mr-1" />
          <span>
            {t('The sender will know that you’ve rejected the article.')}
          </span>
        </div>
      </div>

      <div
        className={cx('flex flex-col rounded-xl mt-6 px-4 py-2', {
          'bg-gray': Boolean(article.sharingComment),
          'items-center': Boolean(!article.sharingComment),
        })}
      >
        <div className="flex">
          <SmsTracking size={20} />
          <span className="ml-2 text-sm font-bold">
            {article.originalTenant?.name ?? ''}
          </span>
        </div>

        {article?.sharingComment && (
          <>
            <span className="my-1 text-sm">{article.sharingComment}</span>
            <span className="text-xs">
              {dayjs(article.createdAt).format('DD MMM YYYY')}
            </span>
          </>
        )}
      </div>

      <div className="flex w-full items-center justify-center mt-6">
        {isLoading && (
          <div className="h-12">
            <PageLoader />
          </div>
        )}

        {!isLoading && (
          <>
            <Button
              className="w-[170px] h-12 ml-3.5 rounded-xl text-sm border-transparent bg-hover-blue hover:bg-focus-background text-focus"
              onClick={rejectArticle}
            >
              {t('Reject')}
            </Button>

            <Button
              className={
                'w-[170px] h-12 ml-3.5 rounded-xl text-sm border-transparent bg-focus hover:bg-hover-primary text-white'
              }
              onClick={approveArticle}
            >
              {t('Approve')}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewPopUp;
