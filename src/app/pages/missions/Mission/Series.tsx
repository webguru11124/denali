import { types } from 'app/api/missions';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import { createSrcSet } from 'app/utils';
import React from 'react';

import ActivityCard from './ActivityCard';

interface SeriesProps {
  name: string;
  totalActivities: number;
  completedActivities: number;
  activities: Array<types.SeriesActivity>;
  missionId: number;
}

const Series: React.FC<SeriesProps> = ({
  name,
  totalActivities,
  completedActivities,
  activities,
  missionId,
}) => {
  const { t } = useMissionsTranslation();

  return (
    <div>
      <p className="text-lg text-grayscale-primary font-bold">{name}</p>
      <p className="text-sm text-grayscale-secondary mt-2">
        {t('Completed {{completedCount}} out of {{totalCount}}', {
          completedCount: completedActivities,
          totalCount: totalActivities,
        })}
      </p>
      <div className="row mt-8">
        {activities.map(
          ({
            id,
            name: activityName,
            comments,
            completed,
            logo,
            userCount,
          }) => (
            <div key={id} className="col-4 mt-4">
              <ActivityCard
                id={id}
                status={completed}
                name={activityName}
                commentsCount={comments}
                missionId={missionId}
                completedByCount={userCount}
                srcSet={logo?.sizes ? createSrcSet(logo.sizes) : undefined}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Series;
