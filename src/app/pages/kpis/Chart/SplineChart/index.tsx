/* eslint-disable react/no-this-in-sfc */
import styled from '@emotion/styled';
import { KpiValueFormat } from 'app/api/kpis/types';
import config from 'app/config';
import { Options } from 'highcharts';
import merge from 'lodash/merge';
import { FC, useMemo } from 'react';

import { Chart as ChartType } from '../../types';
import BaseChart from '../BaseChart';

// Adds gradient background
const Container = styled.div`
  #gradient-0 stop {
    stop-color: ${config.colors.focus};
  }

  #gradient-0 stop[offset='0'] {
    stop-opacity: 0.25;
  }

  #gradient-0 stop[offset='1'] {
    stop-opacity: 0;
  }

  .highcharts-color-0 .highcharts-area {
    fill-opacity: 1;
    fill: url(#gradient-0);
  }
`;

interface SplineChartProps {
  data: ChartType;
  options?: Options;
  kpiValueFormat?: KpiValueFormat;
}

const DEFAULT_OPTIONS = {
  chart: {
    // Enables gradient/custom css
    styledMode: true,
  },
  defs: {
    gradient0: {
      tagName: 'linearGradient',
      id: 'gradient-0',
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 1,
      children: [
        {
          tagName: 'stop',
          offset: 0,
        },
        {
          tagName: 'stop',
          offset: 1,
        },
      ],
    },
  },
};

const SplineChart: FC<SplineChartProps> = ({
  data,
  options: optionsProp,
  kpiValueFormat,
}) => {
  const options = useMemo<Options>(
    () =>
      merge(
        { ...DEFAULT_OPTIONS },
        { ...optionsProp },
        {
          series: data.dataSets.map((dataSet, index) => ({
            // Second dataset should have rounded corners
            type: index === 0 ? 'area' : 'spline',
            name: `chart-series-${index}`,
            data: dataSet.map((item) => item.y),
          })),
        }
      ),
    [data, optionsProp]
  );

  return (
    <Container>
      <BaseChart
        kpiValueFormat={kpiValueFormat}
        data={data}
        options={options}
      />
    </Container>
  );
};

export default SplineChart;
