import { DateRange } from 'app/api/kpis/types';

export type FilterLocationID = number | undefined;
export type SelectedDateRange = DateRange | undefined;
export type CustomSelectedDateRange = {
  selectedDateRange: DateRange | undefined;
  startDate: number | undefined;
  endDate: number | undefined;
};

export interface State {
  filterLocationID: FilterLocationID;
  selectedDateRange: SelectedDateRange;
  startDate?: number | undefined;
  endDate?: number | undefined;
}
