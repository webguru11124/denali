import styled from '@emotion/styled';
import { useAuthenticatedUser } from 'app/api/auth/hooks';
import { KpiValueFormat } from 'app/api/kpis/types';
import { useKpisTranslation } from 'app/internationalization/hooks';
import { routes } from 'app/router';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import ArrowRightIcon from 'remixicon-react/ArrowRightSLineIcon';

import LocationRow from '../../LocationRow';
import useChartLocationsQuery from '../useChartLocationsQuery';

interface LocationsListProps {
  handle: string;
  locationId?: number;
  dateFrom?: number;
  dateTo?: number;
  handleLocationSelection: (locationId: number) => void;
}

const ArrowContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
`;

const LocationsList: FC<LocationsListProps> = ({
  handle,
  locationId,
  dateFrom,
  dateTo,
  handleLocationSelection,
}) => {
  const { data, isLoading: isLocationsLoading } = useChartLocationsQuery({
    handle,
    locationId,
    dateFrom,
    dateTo,
  });

  const { data: user, isManager } = useAuthenticatedUser();
  const { t } = useKpisTranslation();
  if (isLocationsLoading || !user) {
    return null;
  }

  return (
    <div>
      <div className="text-lg flex justify-between items-center my-4">
        <div>
          {data &&
            t('{{locationType}}, {{locationName}}', {
              locationType: data?.location.typeName || '',
              locationName: data?.location.name || '',
            })}
        </div>
        {isManager() && (
          <div>
            <Link
              to={routes.kpiRankings.create(handle)}
              className="flex items-center rounded-lg py-2 bg-primary text-white"
            >
              <span className="text-base px-4">
                {t('See employee ranking')}
              </span>
              <ArrowContainer className=" p-1 rounded ml-auto mr-2  ">
                <ArrowRightIcon className="text-white w-6 h-6" />
              </ArrowContainer>
            </Link>
          </div>
        )}
      </div>
      <div>
        {data?.locations.map(({ id, name, total }) => (
          <LocationRow
            key={id}
            kpiValueFormat={data?.settings?.kpiValueFormat}
            onClick={() => handleLocationSelection(id)}
            name={name}
            total={total}
          />
        ))}
      </div>
    </div>
  );
};
export default LocationsList;
