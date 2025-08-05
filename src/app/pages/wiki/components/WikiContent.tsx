import { types } from 'app/api/wiki';
import { Spinner, PageLoader, InfiniteScroll } from 'app/components';
import { FC } from 'react';

import WikiCard from './WikiCard';

interface WikiContentProps {
  meta: any;
  isLoading: boolean;
  data: Array<types.WikiArticleListItemProps>;
  fetchNext: () => void;
}

const WikiContent: FC<WikiContentProps> = ({
  meta,
  isLoading,
  data,
  fetchNext,
}) =>
  isLoading ? (
    <PageLoader />
  ) : (
    <InfiniteScroll
      dataLength={data.length + 1}
      hasChildren={data.length > 0}
      hasMore={meta?.currentPage < meta?.lastPage || false}
      next={fetchNext}
      loader={
        <div className="h-10 flex justify-center">
          <Spinner />
        </div>
      }
    >
      <div className="row">
        {data?.map((article) => (
          <div className="2xl:col-3 col-4 mb-4" key={article.id}>
            <WikiCard className="mb-2" article={article} />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );

export default WikiContent;
