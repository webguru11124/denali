import { DateRange } from 'app/api/kpis/constants';
import useSummariesQuery from 'app/pages/kpis/useSummariesQuery';
import { dateRangeToUnix } from 'app/pages/kpis/utils';
import { selectors } from 'app/store/kpis';
import { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { match as Match } from 'react-router-dom';

import DefaultBreadcrumb from './DefaultBreadcrumb';

interface KPIBreadcrumbProps {
  match: Match<{ handle: string }>;
}

const KPIBreadcrumb: FC<KPIBreadcrumbProps> = ({ match }) => {
  const [title, setTitle] = useState('');

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

  const getBreadcrumbTitle = useCallback(() => {
    if (!isLoading) {
      const currentSummary = summaries?.summaries.find(
        (summary) => summary.type === match.params.handle
      );
      const summaryTitle =
        currentSummary?.settings.title ?? match.params.handle;

      setTitle(summaryTitle);
    }
  }, [isLoading, match.params.handle, summaries?.summaries]);

  useEffect(() => {
    getBreadcrumbTitle();
  }, [getBreadcrumbTitle]);

  return <DefaultBreadcrumb to={match.url} title={title} />;
};

export default KPIBreadcrumb;
