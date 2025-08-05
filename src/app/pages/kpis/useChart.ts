import { queryKeys, resources } from 'app/api/kpis';
import { GetChartRequest, Chart as ApiChart } from 'app/api/kpis/types';
import { selectData } from 'app/utils';
import flatMap from 'lodash/flatMap';
import max from 'lodash/max';
import { useQuery } from 'react-query';

import { Chart, ChartCell } from './types';

const mapChart = (chart: ApiChart | undefined): Chart | undefined => {
  if (!chart) return undefined;

  const isMonthDays = chart.xAxis.length > 8;

  const mapDataSet = (dataSet: Array<number>): Array<ChartCell> =>
    dataSet.map((value, index) => ({
      y: value,
      x: chart.xAxis[index],
    }));

  const dataSets = chart.yAxis.map(mapDataSet);

  return {
    dataSets,
    xAxis: chart.xAxis,
    type: chart.settings.chartOptions.chart.type,
    isMonthDays,
    maxValue: max(flatMap(chart.yAxis)) ?? 0,
  };
};

const useChart = (requestData: GetChartRequest) => {
  const { data, isLoading, isError } = useQuery(
    queryKeys.getChart(requestData),
    () => resources.getChart(requestData),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return {
    data: mapChart(selectData(data)?.chart),
    isLoading,
    isError,
  };
};

export default useChart;
