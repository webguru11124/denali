import { useMissionActivityQuery } from 'app/api/missions/hooks';
import { Button } from 'app/components';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import React from 'react';
import { useHistory } from 'react-router-dom';

import useActivityCompleted from './useActivityCompleted';

interface ActivityControlProps {
  activityId: number;
}

const ActivityControls: React.FC<ActivityControlProps> = ({ activityId }) => {
  const { data: activity } = useMissionActivityQuery(activityId);
  const { t } = useMissionsTranslation();
  const onCompletedActivityClick = useActivityCompleted(
    activityId,
    activity?.nextId,
    activity?.missionId
  );
  const history = useHistory();

  if (!activity) return null;

  return (
    <div className="row mt-12">
      <div className="col-3 mb-12">
        <Button
          onClick={() => {
            history.goBack();
          }}
          variant="secondary"
          type="button"
        >
          {t('Previous activity')}
        </Button>
      </div>
      <div className="col-7">
        <Button
          onClick={onCompletedActivityClick}
          variant="primary"
          type="button"
        >
          {t('Done')}
        </Button>
      </div>
    </div>
  );
};

export default ActivityControls;
