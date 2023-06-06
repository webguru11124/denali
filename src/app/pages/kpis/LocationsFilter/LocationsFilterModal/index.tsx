import styled from '@emotion/styled';
import { LocationType } from 'app/api/kpis/types';
import { Modal, IconButton } from 'app/components';
import { useKpisTranslation } from 'app/internationalization/hooks';
import { FilterLocationID } from 'app/store/kpis/types';
import React from 'react';
import CloseIcon from 'remixicon-react/CloseLineIcon';

import LocationsList from './LocationsList';

interface LocationsFilterModalProps {
  onClose: () => void;
  locations: Array<LocationType>;
  onFilterSubmit: (selectedLocationId: FilterLocationID) => void;
}

const ModalContent = styled.div`
  width: 624px;
`;

const LocationsFilterModal: React.FC<LocationsFilterModalProps> = ({
  onClose,
  onFilterSubmit,
  locations,
}) => {
  const { t } = useKpisTranslation();
  return (
    <Modal onClose={onClose}>
      <ModalContent>
        <div className="pb-4">
          <div className="flex justify-between w-full relative text-lg">
            {t('Select Location')}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <IconButton onClick={onClose} Icon={CloseIcon} />
            </div>
          </div>
        </div>
        <LocationsList locations={locations} onFilterSubmit={onFilterSubmit} />
      </ModalContent>
    </Modal>
  );
};

export default LocationsFilterModal;
