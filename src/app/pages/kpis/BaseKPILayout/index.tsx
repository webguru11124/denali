import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { DateRange } from 'app/api/kpis/constants';
import { Container } from 'app/components';
import { useSelector, useDispatch, useUrlQuery } from 'app/hooks';
import { actions, selectors } from 'app/store/kpis';
import { ReactNode, useEffect } from 'react';

import LocationsFilter from '../LocationsFilter';

import DateRangeSelect from './DateRangeSelect';
import useDateRangesQuery from './useDateRangesQuery';

interface Props {
  children: ReactNode;
}

const DEFAULT_SELECTED_DATE = DateRange.ThisWeek;

const BaseKPILayout = ({ children }: Props) => {
  const { data: dates, isLoading: isDatesLoading } = useDateRangesQuery();
  const { data: user } = useAuthenticatedUser();
  const selectedDate = useSelector(selectors.getSelectedDateRange);
  const selectedLocationID = useSelector(selectors.getFilterLocationID);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dates || selectedDate) return undefined;

    const defaultSelectedDate =
      dates.find(({ default: defaultSelected }) => defaultSelected) ||
      dates.find(({ slug }) => slug === DEFAULT_SELECTED_DATE);

    if (defaultSelectedDate) {
      dispatch(actions.dateRangeSelected(defaultSelectedDate));
    }

    return undefined;
  }, [dates, dispatch, selectedDate]);

  useEffect(() => {
    if (selectedLocationID) {
      dispatch(actions.locationSelected(Number(selectedLocationID)));
    } else {
      dispatch(actions.locationSelected(user?.location?.id));
    }
  }, [dispatch, selectedLocationID, user?.location?.id]);

  return (
    <div className="flex justify-center mt-6">
      <Container>
        <LocationsFilter />

        <div className="mt-3">
          {dates && !isDatesLoading && (
            <DateRangeSelect
              dates={dates}
              selectedDate={selectedDate}
              onDateSelected={(range) => {
                dispatch(actions.dateRangeSelected(range));
              }}
            />
          )}
        </div>
        {children}
      </Container>
    </div>
  );
};

export default BaseKPILayout;
