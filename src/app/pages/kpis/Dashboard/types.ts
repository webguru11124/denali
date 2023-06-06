import { ChartType } from 'app/api/kpis/constants';

export interface ChartCell {
  x: string | number;
  y: number;
}

export interface Chart {
  dataSets: Array<Array<ChartCell>>;
  xAxis: Array<string>;
  type: ChartType;
  isMonthDays: boolean;
  maxValue: number;
}
