import { DateRange } from 'app/api/kpis/constants';
import { Summary } from 'app/api/kpis/types';
import { PageLoader } from 'app/components';
import { useSelector } from 'app/hooks';
import { routes } from 'app/router';
import { selectors } from 'app/store/kpis';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { dateRangeToUnix } from '../../utils';

import ChartCard from './ChartCard';
import useDatesRangesQuery from './useDatesRangesQuery';

interface ChartsProps {
  summaries: Array<Summary>;
}

const Charts: FC<ChartsProps> = ({ summaries }) => {
  const { data: dates, isLoading: isDatesLoading } = useDatesRangesQuery();
  const selectedDate = useSelector(selectors.getSelectedDateRange);
  const startDate = useSelector(selectors.getSelectedStartDate);
  const endDate = useSelector(selectors.getSelectedEndDate);
  const dateFrom =
    selectedDate?.slug === DateRange.Custom
      ? startDate
      : dateRangeToUnix(selectedDate?.slug);
  const dateTo = selectedDate?.slug === DateRange.Custom ? endDate : undefined;
  const selectedLocationID = useSelector(selectors.getFilterLocationID);

  // TODO: add dates error handling
  if (!dates || isDatesLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <div className="row">
        {summaries.map(
          (
            {
              settings: {
                title,
                subtitle,
                summaryOptions: { mode, primaryName, secondaryName },
                kpiValueFormat,
              },
              total,
              type,
              data,
            },
            index
          ) => (
            <div className="col-6 mb-8" key={index.toString()}>
              <Link to={routes.kpi.create(type, selectedLocationID)}>
                <ChartCard
                  title={title}
                  locationId={selectedLocationID}
                  total={total}
                  kpiValueFormat={kpiValueFormat}
                  mode={mode}
                  type={type}
                  primaryName={primaryName}
                  secondaryName={secondaryName}
                  dateFrom={dateFrom}
                  dateTo={dateTo}
                  subtitle={subtitle}
                  data={data}
                />
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Charts;
