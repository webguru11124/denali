import { useMissionQuery } from 'app/api/missions/hooks';
import { FC, useMemo } from 'react';
import { match as Match } from 'react-router-dom';

import DefaultBreadcrumb from './DefaultBreadcrumb';

interface MissionActivityBreadcrumbProps {
  match: Match<{ missionId: string; id: string }>;
}

const MissionActivityBreadcrumb: FC<MissionActivityBreadcrumbProps> = ({
  match,
}) => {
  const { data } = useMissionQuery(Number(match.params.missionId));

  const currentSeries = useMemo(() => {
    if (!data) return undefined;
    return data.series.find(({ activities }) =>
      activities.find(({ id }) => id === Number(match.params.id))
    );
  }, [data, match.params.id]);

  return <DefaultBreadcrumb to={match.url} title={currentSeries?.name} />;
};

export default MissionActivityBreadcrumb;
