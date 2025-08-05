export enum LocationsTypes {
  Region = 'R',
  Country = 'C',
  Area = 'A',
  Store = 'S',
}

export enum DateRange {
  Custom = 'custom',
  Today = 'today',
  Yesterday = 'yesterday',
  ThisWeek = 'this_week',
  ThisMonth = 'this_month',
  LastSevenDays = 'last_7_days',
  LastThirtyDays = 'last_30_days',
}

export enum InteractiveDisplayMode {
  Chart = 'Chart',
  Summary = 'Summary',
}

export enum ChartType {
  Column = 'column',
  Spline = 'spline',
}

export enum SummaryMode {
  Countup = 'Countup',
  Compared = 'Compared',
}
