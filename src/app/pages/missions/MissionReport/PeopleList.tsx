import { cx } from '@emotion/css';
import { UserMissionStats } from 'app/api/missions/types';
import { PaginatedResponseMeta } from 'app/api/types';
import { PageLoader, Spinner, InfiniteScroll } from 'app/components';
import { createSrcSet } from 'app/utils';
import React from 'react';

import MissionsEmpty from '../MissionsEmpty';

import PersonCard from './PersonCard';

interface PeopleProps {
  users: Array<UserMissionStats> | undefined;
  fetchNextPage: () => void;
  isLoading: boolean;
  meta: PaginatedResponseMeta | undefined;
  totalActivities: number;
}

const People: React.FC<PeopleProps> = ({
  users,
  isLoading,
  meta,
  fetchNextPage,
  totalActivities,
}) => {
  if (!users || !meta || isLoading) {
    return <PageLoader />;
  }

  if (!users.length) {
    return (
      <div className="mt-12">
        <MissionsEmpty />
      </div>
    );
  }
  return (
    <InfiniteScroll
      dataLength={users.length + 1}
      hasMore={meta?.currentPage < meta?.lastPage}
      next={fetchNextPage}
      loader={
        <div className="h-16 flex justify-center">
          <Spinner />
        </div>
      }
    >
      <div className="row">
        {users.map(({ userName, completedActivities, avatars, id }, index) => (
          <div className={cx('col-4', index > 2 && 'mt-6')} key={id}>
            <PersonCard
              name={userName}
              id={id}
              srcSet={createSrcSet(avatars)}
              totalActivities={totalActivities}
              completed={completedActivities}
            />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default People;
