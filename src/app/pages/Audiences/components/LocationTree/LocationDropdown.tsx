import { Location } from 'app/api/auth/types';
import { PageLoader } from 'app/components';
import { Location as LocationIcon } from 'iconsax-react';
import { useEffect, useMemo, useReducer, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import OutsideClickHandler from 'react-outside-click-handler';
import ReactTooltip from 'react-tooltip';

import useLocations from '../../hooks/useLocations';
import { FormFields } from '../audienceFormSchema';
import DropdownContainer from '../DropdownContainer';
import DropdownInput from '../DropdownInput';

import getSelectedIds from './getSelectedIds';
import reducer, { getStateLocation } from './locationsReducer';
import LocationTree from './LocationTree';

interface LocationDropdownProps {
  control: Control<FormFields, unknown>;
  preSelectedLocations?: Location[];
}

const LocationDropdown = ({
  control,
  preSelectedLocations,
}: LocationDropdownProps) => {
  const { locationsTree, isLoading, error } = useLocations();
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    locations: [],
    searchText: '',
  });

  const {
    field: { onChange },
  } = useController({
    control,
    name: 'locations',
  });

  useEffect(() => {
    dispatch({
      type: 'locations-loaded',
      data: locationsTree?.map(getStateLocation) || [],
    });
  }, [locationsTree]);

  useEffect(() => {
    if (
      locationsTree &&
      locationsTree.length > 0 &&
      preSelectedLocations &&
      preSelectedLocations.length > 0
    ) {
      dispatch({
        type: 'pre-select',
        data: preSelectedLocations,
      });
    }
  }, [preSelectedLocations, locationsTree]);

  const onSearch = (text: string) => {
    dispatch({
      type: 'search-input',
      data: { text },
    });
  };

  const toggleSelection = (selected: boolean) => {
    dispatch({
      type: 'toggle-all-selected',
      data: { selected },
    });
  };

  const searchLocations = () => {
    const accumulator = state.locations.filter(function r(location): boolean {
      if (
        location.name
          .toLocaleLowerCase()
          .includes(state.searchText.toLocaleLowerCase())
      ) {
        return true;
      }

      if (location.children && location.children.length > 0) {
        return Boolean(location.children.filter(r).length);
      } else {
        return false;
      }
    });

    return accumulator;
  };

  const visibleLocations = searchLocations();
  const selectedLocations = useMemo(
    () => getSelectedIds(state.locations),
    [state.locations]
  );

  useEffect(() => {
    onChange(selectedLocations);
  }, [selectedLocations, onChange]);

  useEffect(() => {
    if (open && state.locations) ReactTooltip.rebuild();
  }, [open, state.locations]);

  return (
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
      <div>
        <DropdownInput
          text="Locations"
          Icon={LocationIcon}
          totalSelected={
            selectedLocations.length === 0 &&
            preSelectedLocations &&
            preSelectedLocations.length > 0
              ? preSelectedLocations.length
              : selectedLocations.length
          }
          open={open}
          required
          onClick={() => setOpen((prev) => !prev)}
        />

        {open && (
          <DropdownContainer
            total={selectedLocations.length}
            onChange={onSearch}
            deSelectAll={() => toggleSelection(false)}
            selectAll={() => toggleSelection(true)}
          >
            {isLoading && <PageLoader />}
            {state.locations && (
              <LocationTree locations={visibleLocations} dispatch={dispatch} />
            )}
          </DropdownContainer>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default LocationDropdown;
