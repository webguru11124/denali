import { Spinner } from 'app/components';
import { useNewsTranslation } from 'app/internationalization/hooks';
import React from 'react';
import ArrowIcon from 'remixicon-react/ArrowRightSLineIcon';
import LocationIcon from 'remixicon-react/CommunityLineIcon';

import useTeamsQuery from './useTeamsQuery';

interface TeamsListProps {
  articleId: number;
  onLocationSelect: (id: number, locationName: string) => void;
}

interface RowProps {
  locationName: string;
  usersSeen: number;
  totalUsers: number;
  onSelect: () => void;
}

const Row: React.FC<RowProps> = ({
  locationName,
  usersSeen,
  totalUsers,
  onSelect,
}) => {
  const { t } = useNewsTranslation();

  return (
    <div className="flex items-center rounded-lg mb-2 w-full shadow-card bg-white">
      <div className="p-4 rounded-l-lg h-16 w-16 bg-gray-light text-grayscale-secondary flex items-center justify-center">
        <LocationIcon />
      </div>
      <div className="flex flex-col justify-center pl-4">
        <p className="text-grayscale-primary text-sm">{locationName}</p>
        <p className="text-grayscale-secondary text-xs">
          {t('{{seenCount}} out of {{totalCount}} have seen it', {
            seenCount: usersSeen,
            totalCount: totalUsers,
          })}
        </p>
      </div>
      <div className="ml-auto">
        <button
          onClick={onSelect}
          type="button"
          className="p-1 bg-gray-light rounded"
        >
          <ArrowIcon className="text-grayscale-secondary" />
        </button>
      </div>
    </div>
  );
};

const TeamsList: React.FC<TeamsListProps> = ({
  articleId,
  onLocationSelect,
}) => {
  const { data, isLoading } = useTeamsQuery(articleId);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      {data?.map(
        ({ totalUsersInShop, totalUsersSeen, locationId, locationName }) => (
          <Row
            onSelect={() => onLocationSelect(locationId, locationName)}
            key={locationId}
            locationName={locationName}
            totalUsers={totalUsersInShop}
            usersSeen={totalUsersSeen}
          />
        )
      )}
    </div>
  );
};

export default TeamsList;
