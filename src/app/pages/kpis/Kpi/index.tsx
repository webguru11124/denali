import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { DateRange } from 'app/api/kpis/constants';
import { Container, PageLoader, Feature } from 'app/components';
import { useSelector, useDispatch, useUrlQuery } from 'app/hooks';
import { routes } from 'app/router';
import { actions, selectors } from 'app/store/kpis';
import { getSelectedDateRange } from 'app/store/kpis/selectors';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import BaseKPILayout from '../BaseKPILayout';
import useLocationsQuery from '../useLocationsQuery';
import { dateRangeToUnix } from '../utils';

import ChartCard from './ChartCard';
import LocationsList from './LocationsList';
import UsersCarousel from './UsersCarousel';

const Kpi = () => {
  const { handle } = useParams<{ handle: string }>();
  const queryLocation = useUrlQuery('location');
  const selectedDate = useSelector(getSelectedDateRange);
  const startDate = useSelector(selectors.getSelectedStartDate);
  const endDate = useSelector(selectors.getSelectedEndDate);
  const dateFrom =
    selectedDate?.slug === DateRange.Custom
      ? startDate
      : dateRangeToUnix(selectedDate?.slug);
  const dateTo = selectedDate?.slug === DateRange.Custom ? endDate : undefined;

  const { data: user, isManager } = useAuthenticatedUser();
  const selectedLocationID = useSelector(selectors.getFilterLocationID);

  const dispatch = useDispatch();
  const history = useHistory();
  const { data: locations } = useLocationsQuery();

  useEffect(() => {
    dispatch(actions.locationSelected(Number(queryLocation)));
  }, [dispatch, queryLocation]);

  if (!user || !locations) {
    return <PageLoader />;
  }
  const selectedLocation = locations.find(
    ({ id }) => id === selectedLocationID
  );

  return (
    <BaseKPILayout>
      <div className="flex flex-col items-center justify-center pb-21">
        <Container>
          <div>
            <div>
              <ChartCard handle={handle} />
            </div>
            <div className="row">
              <div className="col-12">
                {isManager() ? (
                  <div className="mt-12">
                    <LocationsList
                      handle={handle}
                      locationId={selectedLocationID}
                      dateFrom={dateFrom}
                      dateTo={dateTo}
                      handleLocationSelection={(locationId) => {
                        history.push(routes.kpi.create(handle, locationId));
                      }}
                    />
                  </div>
                ) : (
                  <div className="mt-12">
                    <UsersCarousel
                      locationName={selectedLocation?.name}
                      handle={handle}
                      locationId={selectedLocationID}
                      dateFrom={dateFrom}
                      dateTo={dateTo}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </BaseKPILayout>
  );
};

const FeaturedKpi = () => {
  return <Feature feature="kpiDashboard" activeComponent={Kpi} />;
};

export default FeaturedKpi;
