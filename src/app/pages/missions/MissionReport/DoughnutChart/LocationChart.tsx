import { Spinner } from 'app/components';
import { FC } from 'react';

import Chart from './Chart';
import useUserStatsByLocation from './userUserStatsByLocation';

interface LocationDoughtnutChartProps {
  missionId: number;
  locationId: string;
}

const LocationDoughnutChart: FC<LocationDoughtnutChartProps> = ({
  missionId,
  locationId,
}) => {
  const { data, isLoading } = useUserStatsByLocation(
    missionId,
    Number(locationId)
  );

  if (isLoading || !data) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <Chart
      isLoading={isLoading}
      inProgress={data.totalUsers - data.notStarted - data.completed}
      notStarted={data.notStarted}
      completed={data.completed}
    />
  );
};

export default LocationDoughnutChart;
