import { useComponentsTranslation } from 'app/internationalization/hooks';
import { constants } from 'app/router';
import { FC } from 'react';
import { match as Match } from 'react-router-dom';

import DefaultBreadcrumb from './DefaultBreadcrumb';

interface MissionsListBreadcrumbProps {
  match: Match<{ category: string }>;
}

const MissionsListBreadcrumb: FC<MissionsListBreadcrumbProps> = ({ match }) => {
  const { missionListTypes } = constants;
  const { t } = useComponentsTranslation();

  const getTitle = (category: string) => {
    switch (category) {
      case missionListTypes.active:
        return t('In Progress');
      case missionListTypes.completed:
        return t('Completed');
      case missionListTypes.new:
        return t('Not Started');
      default:
        return t('Mission list');
    }
  };
  return (
    <DefaultBreadcrumb title={getTitle(match.params.category)} to={match.url} />
  );
};

export default MissionsListBreadcrumb;
