import { useVisualGuideQuery } from 'app/api/visualGuides/hooks';
import { FC } from 'react';
import { match as Match } from 'react-router-dom';

import DefaultBreadcrumb from './DefaultBreadcrumb';

interface VisualGuideBreadcrumbProps {
  match: Match<{ id: string }>;
}

const VisualGuideBreadcrumb: FC<VisualGuideBreadcrumbProps> = ({ match }) => {
  const { id } = match.params;
  const { data } = useVisualGuideQuery(Number(id), { enabled: false });

  return <DefaultBreadcrumb to={match.url} title={data?.title} />;
};

export default VisualGuideBreadcrumb;
