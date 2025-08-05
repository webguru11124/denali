import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { Carousel, Null } from 'app/components';
import config from 'app/config';
import { useScreenBreakpoint } from 'app/hooks';
import { useKpisTranslation } from 'app/internationalization/hooks';
import chunk from 'lodash/chunk';
import { FC, useState } from 'react';
import ArrowLeftSLineIcon from 'remixicon-react/ArrowLeftSLineIcon';
import ArrowRightSLineIcon from 'remixicon-react/ArrowRightSLineIcon';

import useRankingsQuery from '../useRankingsQuery';
import UserCard from '../UserCard';

interface UsersListProps {
  handle: string;
  locationId?: number;
  dateFrom?: number;
  dateTo?: number;
  locationName?: string;
}

const Container = styled.div`
  width: 708px;
  @media (min-width: ${config.screenSizes['2xl']}) {
    width: 950px;
  }
`;
const Row = styled.div`
  width: 708px;
  @media (min-width: ${config.screenSizes['2xl']}) {
    width: 950px;
  }
  padding-left: 8px;
  height: 278px;
`;

const UsersList: FC<UsersListProps> = ({
  handle,
  locationName,
  locationId,
  dateFrom,
  dateTo,
}) => {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const breakpoint = useScreenBreakpoint();
  const { data: user } = useAuthenticatedUser();
  const { users, isLoading: isUsersLoading } = useRankingsQuery({
    type: handle,
    locationId,
    dateFrom,
    dateTo,
  });
  const { t } = useKpisTranslation();
  if (!users || !user || isUsersLoading) {
    return null;
  }

  const authUserIndex = users.findIndex(({ id }) => id === user.id);

  const usersToChunk = users.slice(authUserIndex - 3, authUserIndex + 3);

  const chunkedUsers = chunk(
    usersToChunk,
    !['2xl'].includes(breakpoint) ? 3 : 4
  );

  return (
    <Container>
      <p className="text-lg mb-6">
        {t('Employees, {{locationName}}', {
          locationName,
        })}
      </p>
      <div className="relative pt-2 -ml-2">
        {selectedSlide !== 0 && (
          <div className="absolute left-2 inset-y-4 flex items-center z-50 bg-white bg-opacity-80 rounded-l-lg">
            <button
              onClick={() => {
                setSelectedSlide((prev) => {
                  if (prev === 0) {
                    return chunkedUsers.length - 1;
                  }

                  return prev - 1;
                });
              }}
              className="p-2 rounded-lg shadow-card px-4"
              type="button"
            >
              <ArrowLeftSLineIcon />
            </button>
          </div>
        )}
        {selectedSlide !== chunkedUsers.length - 1 && (
          <div className="absolute right-2 inset-y-4 flex items-center z-50 bg-white bg-opacity-80 rounded-r-lg">
            <button
              onClick={() => {
                setSelectedSlide((prev) => {
                  if (prev === chunkedUsers.length - 1) {
                    return 0;
                  }

                  return prev + 1;
                });
              }}
              className="p-2 rounded-lg shadow-card px-4"
              type="button"
            >
              <ArrowRightSLineIcon />
            </button>
          </div>
        )}

        <Carousel
          renderArrowPrev={() => <Null />}
          renderArrowNext={() => <Null />}
          showThumbs={false}
          showStatus={false}
          selectedItem={selectedSlide}
          showIndicators={false}
          infiniteLoop={false}
        >
          {chunkedUsers.map((usersChunk) => (
            <Row key={usersChunk[0].id} className={cx('row my-2')}>
              {usersChunk.map(({ id, fullName, total, avatars }) => (
                <div className="pr-0 col-4 2xl:col-3" key={id}>
                  <UserCard
                    isMe={user.id === id}
                    avatars={avatars}
                    fullName={fullName}
                    total={total}
                    id={id}
                  />
                </div>
              ))}
            </Row>
          ))}
        </Carousel>
      </div>
    </Container>
  );
};

export default UsersList;
