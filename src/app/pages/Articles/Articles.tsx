import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { Empty, Input2 } from 'app/components';
import Pagination from 'app/components/Pagination';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import routes from 'app/router/routes';
import debounce from 'lodash/debounce';
import { useHistory } from 'react-router-dom';

import ArchiveArticleModal from './Components/ArchiveArticleModal';
import ArticleTable from './Components/ArticleTable/ArticleTable';
import ArticleTabsIndicatorContainer from './Components/ArticleTabsIndicatorContainer';
import ArticleCarousel from './Components/Carousel';
import DeleteArticleModal from './Components/DeleteArticleModal';
import { useArticlesContext } from './context';

const Articles = () => {
  const history = useHistory();
  const { t } = useArticlesTranslation();
  const {
    changePage,
    setArticleFilters,
    articlesMeta,
    articles,
    archiveModalState: { open: archiveModalOpen, ids: archiveIds },
    deleteModalState: { open: deleteModalOpen, ids: deleteIds },
  } = useArticlesContext();

  const { data: user } = useAuthenticatedUser();

  const hasConnectAccess = user?.permissions.modules.connectAccess;

  const debounceSearch = debounce(
    (value) =>
      setArticleFilters((rest) => {
        return { ...rest, title: value };
      }),
    500
  );

  return (
    <>
      <div className="pl-3 mr-8">
        <div className="flex w-full items-center">
          <Input2
            placeholder={t('Search for Article')}
            onChange={(e) => debounceSearch(e.target.value)}
            onClear={() => debounceSearch('')}
            isSearch={true}
          />
          <button
            type="button"
            className="ml-4 w-56 h-12 bg-focus text-white rounded-xl hover:bg-hover-primary"
            onClick={() => history.push(routes.editor.create())}
          >
            {t('Create Article')}
          </button>
        </div>
      </div>
      {hasConnectAccess && <ArticleCarousel />}
      <div className="flex justify-between items-end mt-4 ml-3 mr-8 border-b border-hover-blue">
        <ArticleTabsIndicatorContainer />

        {articles && articles.length > 0 && (
          <Pagination
            paginationMeta={articlesMeta}
            changePage={changePage}
            zeroBased
          />
        )}
      </div>
      <div className="ml-1 mr-3">
        <ArticleTable />
      </div>
      {articles && articles.length === 0 && (
        <Empty
          content={{
            heading: `${t("You haven't written any articles yet.")}`,
            text: `${t('Try searching in all articles')}`,
            image: '🔍',
          }}
          className="mt-auto mb-auto"
        />
      )}
      {archiveModalOpen && <ArchiveArticleModal ids={archiveIds} />}
      {deleteModalOpen && <DeleteArticleModal ids={deleteIds} />}
    </>
  );
};

export default Articles;
