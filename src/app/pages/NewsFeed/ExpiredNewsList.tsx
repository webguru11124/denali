import { NewsDataProps } from 'app/api/news/types';
import { PaginatedResponseMeta } from 'app/api/types';
import { NewsCard, InfiniteScroll, Spinner, PageLoader } from 'app/components';
import { routes } from 'app/router';
import React from 'react';

import Empty from './Empty';

interface ExpiredNewsProps {
  query: string;
  category: string;
  news?: Array<NewsDataProps>;
  isLoading: boolean;
  debouncedQuery: string;
  meta?: PaginatedResponseMeta;
  fetchNext: () => void;
}

const ExpiredNewsList: React.FC<ExpiredNewsProps> = ({
  query,
  category,
  news,
  isLoading,
  debouncedQuery,
  meta,
  fetchNext,
}) => {
  if (!news || isLoading || !meta) return <PageLoader />;

  // Compare query with debouncedQuery to prevent empty state displaying upon sudden query deletion
  if (!news.length && query === debouncedQuery) {
    const getEmptyVariant = () => {
      if (category) return 'category';
      return query ? 'search' : 'archived';
    };

    return <Empty variant={getEmptyVariant()} />;
  }

  return (
    <div className="mt-4">
      <InfiniteScroll
        dataLength={news.length + 1}
        hasMore={meta?.currentPage < meta?.lastPage}
        next={fetchNext}
        loader={
          <div className="h-10 flex justify-center">
            <Spinner />
          </div>
        }
      >
        {news.map(
          ({
            id,
            title,
            description,
            createdByAvatars,
            created,
            createdByName,
            categoryTitle,
            totalUsersSeen,
            commentsCount,
            markdown,
            appears,
            createdById,
          }) => (
            <NewsCard
              to={routes.newsArticle.create('expired', id)}
              avatars={createdByAvatars}
              key={id}
              id={id}
              userId={createdById}
              isMarkdown={markdown}
              seenByMe
              commentsCount={commentsCount}
              className="mb-2"
              title={title}
              description={description}
              createdAt={appears || created}
              userName={createdByName}
              category={categoryTitle}
              seenByCount={totalUsersSeen}
            />
          )
        )}
      </InfiniteScroll>
    </div>
  );
};

export default ExpiredNewsList;
