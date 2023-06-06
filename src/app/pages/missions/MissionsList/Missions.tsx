import { Mission } from 'app/api/missions/types';
import { PaginatedResponseMeta } from 'app/api/types';
import { Spinner, PageLoader, Card, InfiniteScroll } from 'app/components';
import { routes } from 'app/router';
import { selectDefinedImageSource } from 'app/utils';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import LightbulbFlashLineIcon from 'remixicon-react/LightbulbFlashLineIcon';

import MissionsEmpty from '../MissionsEmpty';

interface MissionsProps {
  missions?: Array<Mission>;
  meta?: PaginatedResponseMeta;
  isLoading: boolean;
  fetchNextPage: () => void;
}

const Missions: FC<MissionsProps> = ({
  missions,
  meta,
  isLoading,
  fetchNextPage,
}) => {
  if (!missions || !meta || isLoading) {
    return <PageLoader />;
  }

  if (missions.length === 0) {
    return <MissionsEmpty />;
  }

  return (
    <>
      {missions && meta && !isLoading && (
        <InfiniteScroll
          dataLength={missions.length + 1}
          hasMore={meta?.currentPage < meta?.lastPage}
          next={fetchNextPage}
          loader={
            <div className="h-8 flex justify-center">
              <Spinner />
            </div>
          }
        >
          <div className="row">
            {missions.map(({ logoResponsive, name, id }) => (
              <Link
                to={routes.mission.create(id)}
                className="2xl:col-3 col-4 mt-8"
                key={id}
              >
                <Card
                  className="text-center"
                  label={name}
                  logo={
                    logoResponsive ? (
                      <img
                        {...selectDefinedImageSource({
                          srcSet: logoResponsive.sizes,
                          src: logoResponsive.url,
                        })}
                        className="rounded-t-lg object-cover w-full h-full"
                        alt={name}
                      />
                    ) : (
                      <div className="flex rounded-t-lg h-full items-center justify-center bg-pink">
                        <LightbulbFlashLineIcon className="text-white w-12 h-12" />
                      </div>
                    )
                  }
                />
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

export default Missions;
