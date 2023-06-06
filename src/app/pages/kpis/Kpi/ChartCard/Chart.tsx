import styled from '@emotion/styled';
import { SummaryMode } from 'app/api/kpis/constants';
import { KpiValueFormat, SummaryData } from 'app/api/kpis/types';
import config from 'app/config';
import { dayjs } from 'app/utils';
import { FC, useMemo } from 'react';

import BaseChart from '../../Chart';
import { Chart as ChartData } from '../../types';

type Date = string | number;

interface ChartProps {
  dates: Array<Date>;
  mode: SummaryMode;
  chart: ChartData;
  data: SummaryData;
  primaryLegendItem?: string;
  secondaryLegendItem?: string;
  kpiValueFormat?: KpiValueFormat;
}

const CHART_HEIGHT = 300;

const CHART_OPTIONS = {
  chart: {
    height: CHART_HEIGHT,
    spacingLeft: 0,
  },
  xAxis: {
    labels: {
      enabled: true,
    },
    visible: true,
  },
  yAxis: {
    title: undefined,
    opposite: true,
    labels: {
      enabled: true,
    },
  },
  legend: {
    enabled: false,
  },
  title: {
    text: '',
  },
};

const Container = styled.div`
  height: ${CHART_HEIGHT}px;
  .highcharts-grid-line {
    stroke-width: 1px;
    stroke: ${config.colors['gray-light']};
  }
`;

const getLabels = (dates?: Array<Date>) => {
  if (!dates) {
    return undefined;
  }

  const mapDates = (callback: (date: Date) => string) => dates.map(callback);

  return dates.length <= 8
    ? mapDates((date) => dayjs(date).format('ddd'))
    : mapDates((date) => dayjs(date).format('D'));
};

const Chart: FC<ChartProps> = ({
  mode,
  chart,
  data,
  dates,
  primaryLegendItem,
  secondaryLegendItem,
  kpiValueFormat,
}) => {
  const options = useMemo(
    () => ({
      ...CHART_OPTIONS,
      xAxis: {
        ...CHART_OPTIONS.xAxis,
        categories: getLabels(dates),
      },
    }),
    [dates]
  );

  return (
    <Container>
      <BaseChart
        data={data}
        mode={mode}
        kpiValueFormat={kpiValueFormat}
        primaryLegendItem={primaryLegendItem}
        secondaryLegendItem={secondaryLegendItem}
        chart={chart}
        options={options}
        useBaseCharts
      />
    </Container>
  );
};

export default Chart;
