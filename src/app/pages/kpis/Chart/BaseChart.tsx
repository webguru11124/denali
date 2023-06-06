/* eslint-disable react/no-this-in-sfc */
import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { KpiValueFormat } from 'app/api/kpis/types';
import { Chart } from 'app/components';
import config from 'app/config';
import { dayjs } from 'app/utils';
import { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import merge from 'lodash/merge';
import { FC, useMemo, useState } from 'react';
import { renderToString } from 'react-dom/server';

import { Chart as ChartType } from '../types';
import { formatKPIValue } from '../utils';

const datasetColors = {
  primary: config.colors.focus,
  secondary: config.colors.orange,
};

const Container = styled.div`
  .tooltip-blue {
    path {
      fill: ${datasetColors.primary};
    }
  }
  .tooltip-orange {
    path {
      fill: ${datasetColors.secondary};
    }
  }
  .highcharts-color-0 {
    stroke: ${datasetColors.primary};
    fill: ${datasetColors.primary};
  }
  .highcharts-color-1 {
    stroke: ${datasetColors.secondary};
    fill: transparent;
    .highcharts-graph {
      stroke-width: 4px;
    }
  }
`;

interface BaseChartProps {
  data: ChartType;
  options: Options;
  kpiValueFormat?: KpiValueFormat;
}

const DEFAULT_OPTIONS: Options = {
  credits: {
    enabled: false,
  },
  tooltip: {
    borderRadius: 16,
    useHTML: true,
  },
};

const BaseChart: FC<BaseChartProps> = ({
  data,
  options: optionsProp,
  kpiValueFormat,
}) => {
  const [datasetIndex, setDataSetIndex] = useState<number | undefined>();

  const isPrimary = datasetIndex === 0;
  const options = useMemo<Options>(
    () =>
      merge<Options, Options, Options>(
        { ...DEFAULT_OPTIONS },
        { ...optionsProp },
        {
          tooltip: {
            className: isPrimary ? 'tooltip-blue' : 'tooltip-orange',
            formatter() {
              const lastDataSetIndex = optionsProp.series?.findIndex(
                ({ name }) => name === this.point.series.userOptions.name
              );

              if (lastDataSetIndex === -1 || lastDataSetIndex === undefined)
                return null;

              setDataSetIndex(lastDataSetIndex);

              const dataSet = data.dataSets[lastDataSetIndex][this.point.index];
              const dateString = dayjs(dataSet.x).format('MMM D').toUpperCase();
              const value = dataSet.y;
              return renderToString(
                <div
                  className={cx(
                    'rounded-lg text-white',
                    lastDataSetIndex === 0 ? 'bg-focus' : 'bg-orange'
                  )}
                >
                  <p className="text-lg font-bold">
                    {formatKPIValue(value, kpiValueFormat)}
                  </p>
                  <p className="text-sm">{dateString}</p>
                </div>
              );
            },
          },
        }
      ),
    [data.dataSets, isPrimary, kpiValueFormat, optionsProp]
  );

  return (
    <Container>
      <HighchartsReact highcharts={Chart} options={options} />
    </Container>
  );
};

export default BaseChart;
