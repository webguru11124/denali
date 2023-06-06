import { Empty } from 'app/components';

import { useChannelViewContext } from '../context';
import { divideArray } from '../utils';

import ArticleCard from './ArticleCard';
import SkeletonArticlesList from './SkeletonArticlesList';

const ArticlesList = () => {
  const {
    articles: data,
    articlesLoading,
    navigateToArticle,
  } = useChannelViewContext();

  if (articlesLoading) return <SkeletonArticlesList />;

  if (!data) return null;

  if (data.length === 0) {
    return (
      <Empty
        content={{
          heading: "You haven't written any articles yet.",
          text: 'Try searching in all articles',
          image: '🔍',
        }}
        className="mt-auto mb-auto"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="grid gap-4">
        {divideArray(data)[0].map((col) => (
          <ArticleCard
            article={col}
            onClick={() => navigateToArticle(col.id)}
          />
        ))}
      </div>
      <div className="grid gap-4">
        {divideArray(data)[1].map((col) => (
          <ArticleCard
            article={col}
            onClick={() => navigateToArticle(col.id)}
          />
        ))}
      </div>
      <div className="grid gap-4">
        {divideArray(data)[2].map((col) => (
          <ArticleCard
            article={col}
            onClick={() => navigateToArticle(col.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticlesList;
