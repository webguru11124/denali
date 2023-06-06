import { useWikiArticleQuery } from 'app/api/wiki/hooks';
import { PageLoader, RequestError } from 'app/components';
import { useRouteId } from 'app/hooks';
import { FC, useState } from 'react';

import { WikiArticle as ControlledWikiArticle } from './components';

const WikiArticle: FC = () => {
  const id = useRouteId();
  if (typeof id === 'string') throw new Error('Id must be numeric');

  const { data, isLoading, error } = useWikiArticleQuery(id);
  const [isTranslated, setIsTranslated] = useState<boolean>(false);

  if (error) {
    return <RequestError error={error} />;
  }

  if (!data || isLoading) return <PageLoader />;

  return (
    <ControlledWikiArticle
      isTranslated={isTranslated}
      onTranslationToggle={() => setIsTranslated((prevState) => !prevState)}
      article={data}
    />
  );
};

export default WikiArticle;
