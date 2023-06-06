import { LocationsTypes } from 'app/api/kpis/constants';
import { LocationType } from 'app/api/kpis/types';
import { ButtonTag } from 'app/components';
import { useKpisTranslation } from 'app/internationalization/hooks';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import { FC } from 'react';
import GlobalLineIcon from 'remixicon-react/GlobalLineIcon';
import Map2LineIcon from 'remixicon-react/Map2LineIcon';
import MapPin2 from 'remixicon-react/MapPin2LineIcon';
import RoadMapLineIcon from 'remixicon-react/RoadMapLineIcon';
import Sore3LineIcon from 'remixicon-react/Store3LineIcon';

interface LocationsListRowProps {
  locations: Array<LocationType>;
  selectedLocationId: number | null;
  onLocationClick: (locationId: number) => void;
}

const LocationsListRow: FC<LocationsListRowProps> = ({
  locations,
  selectedLocationId,
  onLocationClick,
}) => {
  const { t } = useKpisTranslation();

  const uniqueLocationsTypes = uniqBy(
    locations,
    (location) => location.type
  ).map(({ type, typeName }) => ({
    type,
    typeName,
  }));

  function renderLocationsTypeIcon(itemType: string) {
    switch (itemType) {
      case LocationsTypes.Region:
        return <GlobalLineIcon className="mr-1 w-6 h-6" />;
      case LocationsTypes.Country:
        return <Map2LineIcon className="mr-1 w-6 h-6" />;
      case LocationsTypes.Area:
        return <RoadMapLineIcon className="mr-1 w-6 h-6" />;
      case LocationsTypes.Store:
        return <Sore3LineIcon className="mr-1 w-6 h-6" />;
      default:
        return <MapPin2 className="mr-1 w-6 h-6" />;
    }
  }

  return (
    <div className="rounded-lg shadow-atobi p-3 mb-3">
      <div className="flex">
        {uniqueLocationsTypes.map((item, index) => (
          <div key={item.type} className="flex text-lg pb-2">
            {index > 0 && (
              <div className="text-lg px-1">{t('Locations_connector')}</div>
            )}
            {renderLocationsTypeIcon(item.type)} {item.typeName}
          </div>
        ))}
      </div>
      <div>
        {sortBy(locations, 'name').map(({ id, name }) => (
          <ButtonTag
            key={id}
            isActive={selectedLocationId === id}
            onClick={() => {
              onLocationClick(id);
            }}
          >
            {name}
          </ButtonTag>
        ))}
      </div>
    </div>
  );
};

export default LocationsListRow;
