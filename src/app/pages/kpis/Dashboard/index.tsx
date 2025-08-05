import { DateRange } from 'app/api/kpis/constants';
import { Container, PageLoader, Feature } from 'app/components';
import { useSelector } from 'app/hooks';
import { selectors } from 'app/store/kpis';
import { FC } from 'react';

import BaseKPILayout from '../BaseKPILayout';
import useSummariesQuery from '../useSummariesQuery';
import { dateRangeToUnix } from '../utils';

import Charts from './Charts';
import Empty from './Empty';

const Kpi = () => {
  const selectedLocationID = useSelector(selectors.getFilterLocationID);
  const selectedDate = useSelector(selectors.getSelectedDateRange);
  const startDate = useSelector(selectors.getSelectedStartDate);
  const endDate = useSelector(selectors.getSelectedEndDate);
  const dateFrom =
    selectedDate?.slug === DateRange.Custom
      ? startDate
      : dateRangeToUnix(selectedDate?.slug);
  const dateTo = selectedDate?.slug === DateRange.Custom ? endDate : undefined;

  const { data: summaries, isLoading } = useSummariesQuery({
    locationId: selectedLocationID,
    dateFrom,
    dateTo,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (summaries && !summaries?.summaries?.length) {
    return <Empty />;
  }

  return (
    <BaseKPILayout>
      <div className="flex flex-col items-center justify-center mt-8 pb-21">
        <Container>
          <div className="mt-3">
            <Charts summaries={summaries?.summaries || []} />
          </div>
        </Container>
      </div>
    </BaseKPILayout>
  );
};

const FeaturedKpi = () => (
  <Feature feature="kpiDashboard" activeComponent={Kpi} />
);

export default FeaturedKpi;
