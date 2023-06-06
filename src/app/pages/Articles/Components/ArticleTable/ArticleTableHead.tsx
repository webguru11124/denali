import { useArticlesTranslation } from 'app/internationalization/hooks';
import expand from 'assets/icons/expand.svg';

import { useArticlesContext } from '../../context';

import ArticleTableHeadItem from './ArticleTableHeadItem';
import BulkOperationsRow from './BulkOperationsRow';

const ArticleTableHead = ({ unArchive }: { unArchive: VoidFunction }) => {
  const { t } = useArticlesTranslation();
  const {
    articleFilters: { status },
    setSelectedArticles,
    selectedArticles,
    articles,
  } = useArticlesContext();
  return (
    <thead>
      <tr>
        <ArticleTableHeadItem
          text={t('All articles')}
          margin
          checkboxChangeHandler={() => {
            if (!articles) return;

            if (selectedArticles.length === 0) {
              setSelectedArticles(articles.map((article) => article.id));
              return;
            }

            setSelectedArticles([]);
          }}
        />
        {selectedArticles.length === 0 && (
          <>
            <ArticleTableHeadItem text={t('Channel')} tabName="channel" />
            <ArticleTableHeadItem icon={expand} text={t('Audience')} />
            {(status === 'published' || status === 'inbound') && (
              <ArticleTableHeadItem text={t('Publishing')} />
            )}
            {status !== 'draft' && (
              <ArticleTableHeadItem text={t('Archiving')} />
            )}
            {status === 'draft' && (
              <ArticleTableHeadItem text={t('Recently updated')} />
            )}
            <th id="actions" className="invisible"></th>
          </>
        )}
        {selectedArticles.length > 0 && (
          <BulkOperationsRow unArchive={unArchive} />
        )}
      </tr>
    </thead>
  );
};

export default ArticleTableHead;
