import { cx } from '@emotion/css';
import { BarChart } from 'app/components';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import React from 'react';

import ActivityControls from '../../../ActivityControls';

interface QuizStatsChartProps {
  isLooped: boolean;
  activityId: number;
  stats: Array<number> | undefined;
  isFinished: boolean;
}

const bluredStats = [0, 0, 0, 0, 0, 0];

const QuizStatsChart: React.FC<QuizStatsChartProps> = ({
  isLooped,
  activityId,
  stats,
  isFinished,
}) => {
  const { t } = useMissionsTranslation();

  const resolveDescription = () => {
    if (!isFinished) {
      return t('Post your answer to see your colleagues answers.');
    }

    if (isLooped) {
      return t(
        'This is how many attempts it took you and your colleagues to complete the quiz'
      );
    }

    return t(
      'This is the answers that you and your colleagues selected on this quiz'
    );
  };
  return (
    <div className="col-10 offset-1">
      <div className="pb-2 pl-0 mt-4 border-b border-gray-light">
        <p className="text-lg font-bold text-grayscale-primary">
          {t('All Answers')}
        </p>
      </div>
      <div className=" w-full">
        <p className="text-grayscale-secondary text-base mt-2">
          {resolveDescription()}
        </p>
      </div>
      <div
        className={cx('flex justify-center mt-8', {
          'filter blur-md': !isFinished,
        })}
      >
        <BarChart columns={isFinished && stats ? stats : bluredStats} />
      </div>
      {isFinished && <ActivityControls activityId={activityId} />}
    </div>
  );
};

export default QuizStatsChart;
