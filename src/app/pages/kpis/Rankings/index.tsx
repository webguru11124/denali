import { DateRange } from 'app/api/kpis/constants';
import { RankingUser } from 'app/api/kpis/types';
import { Container, PageLoader, Input, Feature } from 'app/components';
import { useSelector } from 'app/hooks';
import { useKpisTranslation } from 'app/internationalization/hooks';
import { selectors } from 'app/store/kpis';
import orderBy from 'lodash/orderBy';
import { FC, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import SearchIcon from 'remixicon-react/SearchLineIcon';
import { useDebounce } from 'use-debounce';

import LastUpdated from '../LastUpdated';
import LocationsFilter from '../LocationsFilter';
import useRankingsQuery from '../useRankingsQuery';
import { dateRangeToUnix } from '../utils';

import Empty from './Empty';
import UsersList from './UsersList';

const Rankings = () => {
  const selectedLocationId = useSelector(selectors.getFilterLocationID);
  const selectedDate = useSelector(selectors.getSelectedDateRange);
  const startDate = useSelector(selectors.getSelectedStartDate);
  const endDate = useSelector(selectors.getSelectedEndDate);
  const dateFrom =
    selectedDate?.slug === DateRange.Custom
      ? startDate
      : dateRangeToUnix(selectedDate?.slug);
  const dateTo = selectedDate?.slug === DateRange.Custom ? endDate : undefined;
  const { handle } = useParams<{ handle: string }>();
  const [usersFilterValue, setUsersFilterValue] = useState('');
  const [debouncedFilterValue] = useDebounce(usersFilterValue, 500);
  const { users, isLoading, updatedAt } = useRankingsQuery({
    type: handle,
    locationId: selectedLocationId,
    dateFrom,
    dateTo,
  });
  const { t } = useKpisTranslation();

  const indexedUsers = useMemo(() => {
    if (!users) return undefined;
    // Sort users by `total`, assign position
    return orderBy<RankingUser>(users, ['total'], ['desc']).map(
      (user, index) => ({
        ...user,
        position: index + 1,
      })
    );
  }, [users]);

  const filteredIndexedUsers = indexedUsers?.filter(({ fullName }) =>
    fullName.toLocaleLowerCase().includes(debouncedFilterValue.toLowerCase())
  );

  return (
    <div className="flex justify-center mt-6">
      <Container>
        <div className="mb-6">
          <LocationsFilter />
          <Input
            icon={<SearchIcon className="text-grayscale-secondary w-6 h-6" />}
            type="text"
            name="users_filter"
            placeholder={`${t('Search...')}`}
            className="mt-4"
            inputClassName="h-12"
            value={usersFilterValue}
            onChange={(e) => setUsersFilterValue(e.target.value)}
          />
        </div>
        {isLoading && <PageLoader />}
        {filteredIndexedUsers && <UsersList users={filteredIndexedUsers} />}
        {filteredIndexedUsers && filteredIndexedUsers.length === 0 && <Empty />}
        {updatedAt && (
          <div className="mt-8 mb-21">
            <LastUpdated date={updatedAt} />
          </div>
        )}
      </Container>
    </div>
  );
};

const FeaturedRankings = () => (
  <Feature feature="kpiDashboard" activeComponent={Rankings} />
);

export default FeaturedRankings;
