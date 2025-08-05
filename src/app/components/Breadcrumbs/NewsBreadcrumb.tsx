import { useNewsArticleQuery } from 'app/api/news/hooks';
import { FC } from 'react';
import { match as Match } from 'react-router-dom';

import DefaultBreadcrumb from './DefaultBreadcrumb';

interface NewsBreadCrumbProps {
  match: Match<{ id: string }>;
}

const NewsBreadcrumb: FC<NewsBreadCrumbProps> = ({ match }) => {
  const { data } = useNewsArticleQuery(Number(match.params.id));

  return (
    <>
      <DefaultBreadcrumb to={match.url} title={data?.title} />
    </>
  );
};

export default NewsBreadcrumb;
