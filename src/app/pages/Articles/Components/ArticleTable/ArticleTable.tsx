import { css, cx } from '@emotion/css';
import { PageLoader } from 'app/components';
import config from 'app/config';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import routes from 'app/router/routes';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useArticlesContext } from '../../context';
import useArchiveArticleMutation from '../../hooks/useArchiveArticleMutation';
import useUArchiveArticleMutation from '../../hooks/useUnarchiveArticleMutation';
import Toast from '../Toast/Toast';

import ActionsDropMenuCell from './ActionsDropMenuCell';
import ArticleSummaryCell from './ArticleSummaryCell';
import ArticleTableHead from './ArticleTableHead';
import AudienceCell from './AudienceCell';
import ChannelCell from './ChannelCell';
import DateCell from './DateCell';

const ArticleTable = () => {
  const history = useHistory();
  const { t } = useArticlesTranslation();

  const {
    articles,
    isLoading,
    selectedArticles,
    articleFilters: { status },
    setSelectedArticles,
    refetch,
  } = useArticlesContext();

  const { mutate: unArchvieArticle } = useUArchiveArticleMutation();
  const { mutate: archiveArticle } = useArchiveArticleMutation();

  const unArchive = (id?: number) => {
    const articleIds = id ? [id] : selectedArticles;
    unArchvieArticle(
      { articleIds },
      {
        onSuccess: () => onUnArchive(articleIds),
      }
    );
  };

  const onUnArchive = (articleIds: number[]) => {
    setSelectedArticles((prev) => prev.filter((v) => !articleIds.includes(v)));
    refetch?.();

    toast(
      <Toast
        onClick={() => {
          archiveArticle({ articleIds }, { onSuccess: () => refetch?.() });
        }}
        text={`${t('ArticleWas', {
          count: articleIds.length === 0 ? 1 : articleIds.length,
        })} ${t('unarchived & moved to Draft')}`}
      />,
      {
        position: 'bottom-center',
        autoClose: 8000,
        closeButton: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        containerId: 'archive_unarchive',
      }
    );
  };

  if (isLoading) return <PageLoader />;

  const hoveredOrActiveTableRowStyles = `background: ${config.colors['focus-background']};`;

  return (
    <>
      {articles && (
        <table
          className={cx(
            'w-full mt-6.5',
            css('td {padding-top: 8px; padding-bottom:8px;}')
          )}
        >
          <ArticleTableHead unArchive={unArchive} />
          <tbody>
            {articles.map((article) => {
              const mainLanguage =
                article.languages.find((l) => l.isDefault)?.language || 'en';
              return (
                <tr
                  className={cx(
                    'border-b border-b-hover-blue cursor-pointer',
                    css(`
                  &:hover {
                    ${hoveredOrActiveTableRowStyles}
                  }
                  ${
                    selectedArticles.includes(article.id) &&
                    hoveredOrActiveTableRowStyles
                  }
                `)
                  )}
                  key={article.id}
                  onClick={() =>
                    history.push(
                      routes.editorArticle.create(article.id.toString(), 'edit')
                    )
                  }
                >
                  <ArticleSummaryCell
                    title={
                      article.variants[mainLanguage]?.title ??
                      article.variants['en'].title
                    }
                    status={article.status}
                    id={article.id}
                    coverImage={
                      article.variants[mainLanguage]?.coverImage?.url
                        ? `${config.env.articlesApiUrl}/${article.variants[mainLanguage].coverImage.url}`
                        : article.variants['en']?.coverImage?.url
                        ? `${config.env.articlesApiUrl}/${article.variants['en'].coverImage.url}`
                        : undefined
                    }
                  />
                  <ChannelCell channel={article.channel} />
                  <AudienceCell
                    audienceResources={article.audiencesResources}
                  />
                  {(status === 'published' || status === 'inbound') && (
                    <DateCell date={article.publishAt} />
                  )}
                  {status !== 'draft' && <DateCell date={article.archiveAt} />}
                  {status === 'draft' && <DateCell date={article.updatedAt} />}
                  <ActionsDropMenuCell id={article.id} unArchive={unArchive} />
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ArticleTable;
