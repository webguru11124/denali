import { NewsDataProps } from 'app/api/news/types';
import { NewsCard, PageLoader } from 'app/components';
import { routes } from 'app/router';
import React from 'react';

import Empty from './Empty';

interface NewsListProps {
  query: string;
  category: string;
  news?: Array<NewsDataProps>;
  isLoading: boolean;
  debouncedQuery: string;
}

const NewsList: React.FC<NewsListProps> = ({
  query,
  category,
  news,
  isLoading,
  debouncedQuery,
}) => {
  if (isLoading || !news) return <PageLoader />;

  // Compare query with debouncedQuery to prevent empty state displaying upon sudden query deletion
  if (!news.length && query === debouncedQuery) {
    const getEmptyVariant = () => {
      if (category) return 'category';
      return query ? 'search' : 'latest';
    };

    return <Empty variant={getEmptyVariant()} />;
  }

  return (
    <div className="mt-4">
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
          seenByMe,
          appears,
          createdById,
        }) => (
          <NewsCard
            to={routes.newsArticle.create('relevant', id)}
            avatars={createdByAvatars}
            key={id}
            id={id}
            userId={createdById}
            isMarkdown={markdown}
            seenByMe={seenByMe}
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
    </div>
  );
};

export default NewsList;
