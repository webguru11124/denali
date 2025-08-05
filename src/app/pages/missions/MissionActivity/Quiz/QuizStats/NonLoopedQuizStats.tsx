import { QuizAnswer } from 'app/api/missions/types';
import { Spinner } from 'app/components';
import React, { useState, useEffect } from 'react';

import QuizStatsChart from './QuizStatsChart';
import useQuizStatsQuery from './useQuizStatsQuery';

interface QuizStatsProps {
  activityId: number;

  answers: Array<QuizAnswer>;
  isFinished: boolean;
}

const NonLoopedQuizStats: React.FC<QuizStatsProps> = ({
  activityId,

  answers,
  isFinished,
}) => {
  const {
    data: apiStats,
    isLoading,
    isFetching,
  } = useQuizStatsQuery(activityId);
  const [stats, setStats] = useState<Array<number>>();

  useEffect(() => {
    if (!apiStats) return undefined;
    const formattedStats = answers.map(({ uuid }) => {
      const answerStats = apiStats.answers.find(
        ({ uuid: answerId }) => uuid === answerId
      );

      return answerStats?.total || 0;
    });

    setStats(formattedStats);
    return undefined;
  }, [apiStats, answers]);

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <QuizStatsChart
        isLooped={false}
        stats={stats}
        activityId={activityId}
        isFinished={isFinished}
      />
    </div>
  );
};

export default NonLoopedQuizStats;
