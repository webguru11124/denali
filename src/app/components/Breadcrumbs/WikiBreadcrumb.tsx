import { useWikiArticleQuery } from 'app/api/wiki/hooks';
import { routes } from 'app/router';
import { FC } from 'react';
import { match as Match } from 'react-router-dom';

import DefaultBreadcrumb from './DefaultBreadcrumb';
import Seperator from './Seperator';

interface WikiBreadcrumbProps {
  match: Match<{ id: string }>;
}

const WikiBreadcrumb: FC<WikiBreadcrumbProps> = ({ match }) => {
  const { id } = match.params;
  const { data } = useWikiArticleQuery(Number(id), { enabled: false });

  return (
    <>
      {data?.parent.id && (
        <>
          <DefaultBreadcrumb
            to={routes.wikiArticle.create(data.parent.id)}
            title={data.parent.title}
          />
          <Seperator />
        </>
      )}
      <DefaultBreadcrumb to={match.url} title={data?.title} />
    </>
  );
};

export default WikiBreadcrumb;
