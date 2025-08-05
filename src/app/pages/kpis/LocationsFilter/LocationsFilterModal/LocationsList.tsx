import { LocationType } from 'app/api/kpis/types';
import { Button } from 'app/components';
import { useSelector } from 'app/hooks';
import { useKpisTranslation } from 'app/internationalization/hooks';
import { selectors } from 'app/store/kpis';
import { FC, useState } from 'react';

import LocationsListRow from './LocationsListRow';

interface LocationsListProps {
  onFilterSubmit: (locationId: number) => void;
  locations: Array<LocationType>;
}

const LocationsList: FC<LocationsListProps> = ({
  onFilterSubmit,
  locations,
}) => {
  const initialSelectedLocationId = useSelector(selectors.getFilterLocationID);
  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(
    initialSelectedLocationId
  );

  const { t } = useKpisTranslation();

  return (
    <div>
      {selectedLocation && (
        <>
          <LocationsListRow
            locations={locations}
            selectedLocationId={selectedLocation}
            onLocationClick={(locationId) => {
              setSelectedLocation(locationId);
            }}
          />
          <div className="w-2/5 mx-auto mt-6 mb-2">
            <Button
              variant="primary"
              onClick={() => {
                onFilterSubmit(selectedLocation);
              }}
            >
              {t('Apply filter')}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationsList;
