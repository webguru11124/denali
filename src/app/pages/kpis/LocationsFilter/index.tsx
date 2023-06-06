import { useSelector, useDispatch } from 'app/hooks';
import { useKpisTranslation } from 'app/internationalization/hooks';
import { actions, selectors } from 'app/store/kpis';
import { FC, useState } from 'react';
import ArrowRightSLineIcon from 'remixicon-react/ArrowRightSLineIcon';
import MapPin2 from 'remixicon-react/MapPin2LineIcon';

import useLocationsQuery from '../useLocationsQuery';

import LocationsFilterModal from './LocationsFilterModal';

const LocationsFilter: FC = () => {
  const { data: locations } = useLocationsQuery();
  const dispatch = useDispatch();

  const selectedLocationID = useSelector(selectors.getFilterLocationID);
  const { t } = useKpisTranslation();
  const [
    shouldDisplayLocationsFilterModal,
    setShouldDisplayLocationsFilterModal,
  ] = useState(false);

  const selectedLocation = locations?.find(
    ({ id }) => id === selectedLocationID
  );

  return (
    <div className="row">
      {shouldDisplayLocationsFilterModal && locations && (
        <LocationsFilterModal
          onClose={() => setShouldDisplayLocationsFilterModal(false)}
          locations={locations}
          onFilterSubmit={(locationsId) => {
            setShouldDisplayLocationsFilterModal(false);
            dispatch(actions.locationSelected(locationsId));
          }}
        />
      )}
      <div className="col-12">
        <div className="bg-grayscale-bg-dark rounded-lg">
          <button
            type="button"
            onClick={() => setShouldDisplayLocationsFilterModal(true)}
            className="flex items-center w-full justify-between p-3 text-primary rounded-lg"
          >
            <div className="flex">
              <MapPin2 className="mr-4 w-6 h-6" />{' '}
              <span className="font-bold text-focus">
                {selectedLocation?.name || t('Select location')}
              </span>
            </div>
            <ArrowRightSLineIcon className="text-focus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationsFilter;
