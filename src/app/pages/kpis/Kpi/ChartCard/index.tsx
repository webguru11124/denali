import { DateRange } from 'app/api/kpis/constants';
import { Spinner } from 'app/components';
import { useSelector } from 'app/hooks';
import { useKpisTranslation } from 'app/internationalization/hooks';
import { routes } from 'app/router';
import { selectors } from 'app/store/kpis';
import { FC } from 'react';
import { Redirect } from 'react-router-dom';

import useChart from '../../useChart';
import useSummariesQuery from '../../useSummariesQuery';
import {
  dateRangeToUnix,
  dateRangeToString,
  formatKPIValue,
} from '../../utils';

import ChartComponent from './Chart';

interface ChartProps {
  handle: string;
}

const Chart: FC<ChartProps> = ({ handle }) => {
  const { t } = useKpisTranslation();
  const selectedLocationID = useSelector(selectors.getFilterLocationID);
  const selectedDateRange = useSelector(selectors.getSelectedDateRange);
  const startDate = useSelector(selectors.getSelectedStartDate);
  const endDate = useSelector(selectors.getSelectedEndDate);
  const dateFrom =
    selectedDateRange?.slug === DateRange.Custom
      ? startDate
      : dateRangeToUnix(selectedDateRange?.slug);
  const dateTo =
    selectedDateRange?.slug === DateRange.Custom ? endDate : undefined;
  const { data: summaries, isLoading: isSummariesLoading } = useSummariesQuery({
    locationId: selectedLocationID,
    dateFrom,
    dateTo,
  });
  const { data: chart, isLoading } = useChart({
    type: handle,
    dateFrom,
    dateTo,
    locationId: selectedLocationID,
  });

  if (!chart || isLoading || !summaries || isSummariesLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const summary = summaries.summaries.find(({ type }) => type === handle);

  if (!summary) return <Redirect to={routes.kpis.create()} />;

  const dates = chart.dataSets[0].map(({ x }) => x);
  const {
    settings: {
      summaryOptions: { primaryName: originalPrimaryName },
    },
  } = summary;
  const {
    settings: {
      summaryOptions: { secondaryName: originalSecondaryName },
    },
  } = summary;
  const primaryName =
    originalPrimaryName === 'Total'
      ? t(originalPrimaryName)
      : originalPrimaryName;
  const secondaryName =
    originalSecondaryName === 'Target'
      ? t(originalSecondaryName)
      : originalSecondaryName;

  return (
    <div>
      <p className="text-lg font-bold">
        {formatKPIValue(summary.total, summary.settings.kpiValueFormat)}
      </p>
      <p className="text-sm">
        {selectedDateRange ? dateRangeToString(selectedDateRange.slug) : null}
      </p>
      <div className="mt-2">
        <ChartComponent
          kpiValueFormat={summary.settings.kpiValueFormat}
          mode={summary.settings.summaryOptions.mode}
          primaryLegendItem={primaryName}
          secondaryLegendItem={secondaryName}
          dates={dates}
          chart={chart}
          data={summary.data}
        />
      </div>
    </div>
  );
};

export default Chart;
