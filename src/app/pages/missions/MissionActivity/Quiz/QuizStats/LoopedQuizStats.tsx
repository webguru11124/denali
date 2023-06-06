import { PageLoader } from 'app/components';
import React from 'react';

import QuizStatsChart from './QuizStatsChart';
import useLoopedQuizStats from './useLoopedQuizStats';

interface QuizStatsProps {
  activityId: number;
  isFinished: boolean;
}

const NonLoopedQuizStats: React.FC<QuizStatsProps> = ({
  activityId,
  isFinished,
}) => {
  const { data: stats, isLoading } = useLoopedQuizStats(activityId);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!stats) {
    return null;
  }
  return (
    <div>
      <QuizStatsChart
        isLooped
        stats={Object.values(stats.answers).map(({ count }) => count)}
        activityId={activityId}
        isFinished={isFinished}
      />
    </div>
  );
};

export default NonLoopedQuizStats;
