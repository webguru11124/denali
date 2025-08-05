import { cx, css } from '@emotion/css';
import { PageLoader, Spinner, InfiniteScroll } from 'app/components';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import { routes } from 'app/router';
import React from 'react';
import { useHistory } from 'react-router-dom';

import MissionsEmpty from '../MissionsEmpty';

import { OnResponseReceived } from './types';
import useMissionLocationsStatsQuery from './useMissionLocationsStatsQuery';

interface LocationsProps {
  searchQuery: string;
  missionId: number;
  onResponseReceived: OnResponseReceived;
}

interface LocationCardProps {
  name: string;
  totalUsers: number;
  completed: number;
  started: number;
  onClick: () => void;
}

const LocationCard = ({
  name,
  totalUsers,
  completed,
  started,
  onClick,
}: LocationCardProps) => {
  const { t } = useMissionsTranslation();

  const completedPercentage = Math.round((completed / totalUsers) * 100);
  const startedPercentage = Math.round((started / totalUsers) * 100);
  return (
    <button
      type="button"
      onClick={onClick}
      className="shadow-atobi rounded-lg p-3 pb-5 w-full text-left"
    >
      <p className="text-grayscale-primary">
        <span className="line-clamp-1">{name}</span>
      </p>
      <p className="text-grayscale-secondary text-sm mt-1">
        {t('{{completedCount}} / {{totalCount}} people completed', {
          completedCount: completed,
          totalCount: totalUsers,
        })}
      </p>
      <p className="text-grayscale-secondary text-sm mt-6">
        {completedPercentage}%
      </p>
      <div className="relative rounded-full h-4 w-full bg-gray-light">
        <div
          className={cx(
            'h-full absolute z-10 left-0 bg-success rounded-full',
            css`
              width: ${completedPercentage}%;
            `
          )}
        />
        <div
          className={cx(
            'h-full absolute z-0 left-0 bg-warning rounded-full',
            css`
              width: ${completedPercentage + startedPercentage}%;
            `
          )}
        />
      </div>
    </button>
  );
};

const Locations: React.FC<LocationsProps> = ({
  searchQuery,
  missionId,
  onResponseReceived,
}) => {
  const {
    data: locations,
    meta,
    isLoading,
    fetchNextPage,
  } = useMissionLocationsStatsQuery(missionId, searchQuery, onResponseReceived);
  const history = useHistory();

  if (isLoading || !locations || !meta) {
    return <PageLoader />;
  }

  if (!locations.length) {
    return (
      <div className="mt-12">
        <MissionsEmpty />
      </div>
    );
  }
  return (
    <InfiniteScroll
      dataLength={locations.length + 1}
      hasMore={meta?.currentPage < meta?.lastPage}
      next={fetchNextPage}
      loader={
        <div className="h-16 flex justify-center">
          <Spinner />
        </div>
      }
    >
      <div className="row">
        {locations.map(
          ({ name, userCount, totalCompleted, totalStarted, id }, index) => (
            <div className={cx('col-4', index > 2 && 'mt-6')} key={id}>
              <LocationCard
                onClick={() => {
                  history.push(
                    routes.missionReport.create(missionId, 'teams', id)
                  );
                }}
                totalUsers={userCount}
                name={name}
                completed={totalCompleted}
                started={totalStarted}
              />
            </div>
          )
        )}
      </div>
    </InfiniteScroll>
  );
};

export default Locations;
