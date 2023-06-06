/* eslint-disable react/no-this-in-sfc */
import { KpiValueFormat } from 'app/api/kpis/types';
import config from 'app/config';
import { Options } from 'highcharts';
import merge from 'lodash/merge';
import { FC, useMemo } from 'react';

import { Chart as ChartType } from '../../types';
import BaseChart from '../BaseChart';

interface ColumnChartProps {
  data: ChartType;
  options?: Options;
  kpiValueFormat?: KpiValueFormat;
}

const ColumnChart: FC<ColumnChartProps> = ({
  data,
  options: optionsProp,
  kpiValueFormat,
}) => {
  const options = useMemo(
    () =>
      merge(
        { ...optionsProp },
        {
          plotOptions: {
            column: {
              grouping: false,
              borderRadiusTopLeft: 6,
              borderRadiusTopRight: 6,
            },
          },
          series: [
            {
              type: 'column',
              data: data?.dataSets[0].map((item) => item.y),
              color: config.colors.focus,
              marker: {
                enabled: false,
              },
            },
          ],
        }
      ),
    [data.dataSets, optionsProp]
  );
  return (
    <BaseChart kpiValueFormat={kpiValueFormat} data={data} options={options} />
  );
};

export default ColumnChart;
