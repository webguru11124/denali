import { SummaryMode, ChartType } from 'app/api/kpis/constants';
import { KpiValueFormat, SummaryData } from 'app/api/kpis/types';
import { Options } from 'highcharts';
import { FC } from 'react';

import { Chart as ChartData } from '../types';
import { selectDataSets } from '../utils';

import ColumnChart from './ColumnChart';
import ComparedChart from './ComparedChart';
import LegendItem from './LegendItem';
import SplineChart from './SplineChart';

interface ChartProps {
  mode: SummaryMode;
  chart: ChartData;
  primaryName?: string;
  secondaryName?: string;
  data: SummaryData;
  options: Options;
  // If true will not display compared chart
  useBaseCharts?: boolean;
  primaryLegendItem?: string;
  secondaryLegendItem?: string;
  kpiValueFormat?: KpiValueFormat;
}

const Chart: FC<ChartProps> = ({
  mode,
  chart: { type, dataSets, ...restChart },
  primaryName,
  secondaryName,
  data: { total, target },
  options,
  useBaseCharts,
  primaryLegendItem,
  secondaryLegendItem,
  kpiValueFormat,
}) => {
  const renderChart = () => {
    if (mode === SummaryMode.Compared && !useBaseCharts) {
      return (
        <ComparedChart
          total={total}
          kpiValueFormat={kpiValueFormat}
          target={target}
          primaryName={primaryName}
          secondaryName={secondaryName}
        />
      );
    }

    const selectedDataSets = selectDataSets(dataSets, mode);
    if (type === ChartType.Column) {
      return (
        <ColumnChart
          options={options}
          kpiValueFormat={kpiValueFormat}
          data={{
            ...restChart,
            type,
            dataSets: selectedDataSets,
          }}
        />
      );
    }

    if (type === ChartType.Spline) {
      return (
        <SplineChart
          kpiValueFormat={kpiValueFormat}
          options={options}
          data={{ ...restChart, type, dataSets: selectedDataSets }}
        />
      );
    }

    throw new Error(`Unknown chart mode (${mode}) or type (${type})`);
  };

  return (
    <div>
      {renderChart()}
      <div className="flex">
        {primaryLegendItem && (
          <LegendItem
            indicatorClassName="bg-focus"
            name={primaryLegendItem}
            className="mr-8"
          />
        )}
        {secondaryLegendItem && (
          <LegendItem
            indicatorClassName="bg-orange"
            name={secondaryLegendItem}
            className="mr-9"
          />
        )}
      </div>
    </div>
  );
};

export default Chart;
