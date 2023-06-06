import { types } from 'app/api/news';
import { Spinner } from 'app/components';
import { useNewsTranslation } from 'app/internationalization/hooks';
import React from 'react';

import useLocationQuery from './useLocationQuery';
import UserRow from './UserRow';

interface LocationViewProps {
  articleId: number;
  locationId: number;
}

type ReducerAcc = {
  unseenUsers: Array<types.LocationUser>;
  seenUsers: Array<types.LocationUser>;
};

const reduceUsers = (users: Array<types.LocationUser>): ReducerAcc => {
  const defaultVal: ReducerAcc = {
    seenUsers: [],
    unseenUsers: [],
  };
  return users?.reduce((acc: ReducerAcc, { seen, ...rest }) => {
    if (seen) {
      return {
        ...acc,
        seenUsers: [
          ...acc.seenUsers,
          {
            seen,
            ...rest,
          },
        ],
      };
    }

    return {
      ...acc,
      unseenUsers: [
        ...acc.unseenUsers,
        {
          seen,
          ...rest,
        },
      ],
    };
  }, defaultVal);
};

const LocationView: React.FC<LocationViewProps> = ({
  articleId,
  locationId,
}) => {
  const { t } = useNewsTranslation();

  const { data, isLoading } = useLocationQuery(articleId, locationId);

  if (isLoading || !data) {
    return (
      <div className="flex items-center h-full justify-center ">
        <Spinner />
      </div>
    );
  }

  const { seenUsers, unseenUsers } = reduceUsers(data.users);
  return (
    <div>
      <div className="flex flex-col">
        <p className="text-base text-grayscale-primary mb-2">
          {t('Seen by {{count}}', {
            count: data.seenByCount,
          })}
        </p>
        {seenUsers.map(({ userId, userAvatars, userName }) => (
          <UserRow avatar={userAvatars.medium} name={userName} key={userId} />
        ))}
        {data.seenFormerCount > 0 && (
          <span className="text-sm text-grayscale-primary mb-1">
            {t('+{{count}} former members', {
              count: data.seenFormerCount,
            })}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-base text-grayscale-primary mb-2">
          {t('Not seen by {{count}}', {
            count: data.unseenByCount,
          })}
        </p>
        {unseenUsers.map(({ userId, userAvatars, userName }) => (
          <UserRow avatar={userAvatars.medium} name={userName} key={userId} />
        ))}
        {data.unseenFormerCount > 0 && (
          <span className="text-sm text-grayscale-primary mb-1">
            {t('+{{count}} former members', {
              count: data.unseenFormerCount,
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default LocationView;
