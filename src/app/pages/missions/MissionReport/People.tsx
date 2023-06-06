import { CompletionStatus } from 'app/api/missions/constants';
import React from 'react';

import PeopleList from './PeopleList';
import { OnResponseReceived } from './types';
import useUsersStatsQuery from './useUsersStatsQuery';

interface PeopleProps {
  missionId: number;
  totalActivities: number;
  completionStatus: '' | CompletionStatus;
  searchQuery: string;
  onResponseReceived: OnResponseReceived;
}

const People: React.FC<PeopleProps> = ({
  missionId,
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
    onResponseReceived
  );

  return (
    <PeopleList
      meta={meta}
      totalActivities={totalActivities}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      users={users}
    />
  );
};

export default People;
