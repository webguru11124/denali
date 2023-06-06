import { FC } from 'react';

import LocationChart from './LocationChart';
import MissionChart from './MissionChart';

interface DoughnutChartProps {
  missionId: number;
  locationId?: string;
}

const DoughnutChart: FC<DoughnutChartProps> = ({ missionId, locationId }) => {
  if (locationId) {
    return <LocationChart missionId={missionId} locationId={locationId} />;
  }

  return <MissionChart missionId={missionId} />;
};

export default DoughnutChart;
