import { SummaryMode } from 'app/api/kpis/constants';

import { ChartCell } from '../types';

const selectDataSets = (
  dataSets: Array<Array<ChartCell>>,
  mode: SummaryMode
) => {
  if (mode === SummaryMode.Countup) {
    return [dataSets[0]];
  }

  return dataSets;
};

export default selectDataSets;
