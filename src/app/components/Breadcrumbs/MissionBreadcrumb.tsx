import { useMissionQuery } from 'app/api/missions/hooks';
import { FC } from 'react';
import { match as Match } from 'react-router-dom';

import DefaultBreadcrumb from './DefaultBreadcrumb';

interface MissionBreadcrumbProps {
  match: Match<{ id: string }>;
}

const MissionBreadcrumb: FC<MissionBreadcrumbProps> = ({ match }) => {
  const { data } = useMissionQuery(Number(match.params.id));

  return <DefaultBreadcrumb to={match.url} title={data?.name} />;
};

export default MissionBreadcrumb;
