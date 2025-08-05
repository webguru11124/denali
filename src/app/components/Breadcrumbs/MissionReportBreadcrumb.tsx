import { useMissionQuery } from 'app/api/missions/hooks';
import { useComponentsTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';
import { match as Match } from 'react-router-dom';

import DefaultBreadcrumb from './DefaultBreadcrumb';

interface MissionReportBreadcrumbProps {
  match: Match<{ id: string }>;
}

const MissionReportBreadcrumb: FC<MissionReportBreadcrumbProps> = ({
  match,
}) => {
  const { data } = useMissionQuery(Number(match.params.id));
  const { t } = useComponentsTranslation();
  return (
    <DefaultBreadcrumb
      to={match.url}
      title={data?.name && `${t('{{name}} Report', { name: data.name })}`}
    />
  );
};

export default MissionReportBreadcrumb;
