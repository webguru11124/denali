import { CompletionStatus } from 'app/api/missions/constants';
import React from 'react';

import PeopleList from './PeopleList';
import { OnResponseReceived } from './types';
import useUsersStatsQuery from './useUsersStatsQuery';

interface LocationUsersProps {
  missionId: number;
  locationId: string;
  totalActivities: number;
  completionStatus: '' | CompletionStatus;
  searchQuery: string;
  onResponseReceived: OnResponseReceived;
}

const LocationUsers: React.FC<LocationUsersProps> = ({
  missionId,
  locationId,
  totalActivities,
  completionStatus,
  searchQuery,
  onResponseReceived,
}) => {
  const {
    data: users,
    meta,
    isLoading,
    fetchNextPage,
  } = useUsersStatsQuery(
    missionId,
    completionStatus,
    searchQuery,
    onResponseReceived,
    locationId
  );

  return (
    <PeopleList
      users={users}
      meta={meta}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      totalActivities={totalActivities}
    />
  );
};

export default LocationUsers;
