import { FC } from 'react';

import useMissionStatsQuery from '../useMissionStatsQuery';

import Chart from './Chart';

interface MissionChartProps {
  missionId: number;
}

const MissionChart: FC<MissionChartProps> = ({ missionId }) => {
  const { data: missionStats, isLoading } = useMissionStatsQuery(missionId);
  return (
    <Chart
      isLoading={isLoading}
      inProgress={missionStats?.inProgress || 0}
      notStarted={missionStats?.notStarted || 0}
      completed={missionStats?.completed || 0}
    />
  );
};

export default MissionChart;
