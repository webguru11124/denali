import { useMissionActivityQuery } from 'app/api/missions/hooks';
import { Spinner } from 'app/components';
import { useRouteId } from 'app/hooks';
import React from 'react';
import { useParams } from 'react-router-dom';

import LoopedQuizStats from './LoopedQuizStats';
import NonLoopedQuizStats from './NonLoopedQuizStats';

interface QuizStatsProps {
  isFinished: boolean;
}

const QuizStats: React.FC<QuizStatsProps> = ({ isFinished }) => {
  const activityId = useRouteId();
  const { missionId } = useParams<{ missionId: string }>();
  const numericMissionId = Number(missionId);
  if (typeof numericMissionId !== 'number')
    throw new Error('Mission ID should be numeric');
  if (typeof activityId === 'string')
    throw new Error('Activity ID should be numeric');

  const { data: activity, isLoading: isActivityLoading } =
    useMissionActivityQuery(activityId);

  if (isActivityLoading || !activity) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {activity.loop ? (
        <LoopedQuizStats activityId={activityId} isFinished={isFinished} />
      ) : (
        <NonLoopedQuizStats
          answers={activity.answers}
          activityId={activityId}
          isFinished={isFinished}
        />
      )}
    </>
  );
};

export default QuizStats;
