import styled from '@emotion/styled';
import { SummaryMode } from 'app/api/kpis/constants';
import { KpiValueFormat, SummaryData } from 'app/api/kpis/types';
import { FC } from 'react';

import BaseChart from '../../../Chart';
import { Chart as ChartData } from '../../../types';

interface ChartMeta {
  primaryName: string;
  secondaryName?: string;
  data: SummaryData;
}

interface ChartProps extends ChartMeta {
  mode: SummaryMode;
  chart: ChartData;
  kpiValueFormat?: KpiValueFormat;
}

const CHART_HEIGHT = 140;

const CHART_OPTIONS = {
  chart: {
    height: CHART_HEIGHT,
  },
  xAxis: {
    labels: {
      enabled: false,
    },
    visible: false,
  },
  yAxis: {
    visible: false,
    labels: {
      enabled: false,
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
`;

const Chart: FC<ChartProps> = ({
  mode,
  chart,
  primaryName,
  secondaryName,
  data,
  kpiValueFormat,
}) => (
  <Container>
    <BaseChart
      data={data}
      chart={chart}
      mode={mode}
      kpiValueFormat={kpiValueFormat}
      options={CHART_OPTIONS}
      primaryName={primaryName}
      secondaryName={secondaryName}
    />
  </Container>
);

export default Chart;
