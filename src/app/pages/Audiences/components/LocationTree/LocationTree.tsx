import { ComponentProps, Dispatch } from 'react';

import { Location, Action } from './locationsReducer';
import LocationTreeItem from './LocationTreeItem';

const getLocationNodeProps = ({
  onSelectClick,
  onExpandClick,
  onSelectChildrenClick,
  location,
}: {
  onSelectClick: (id: number) => void;
  onExpandClick: (id: number) => void;
  onSelectChildrenClick: (id: number) => void;
  location: Location;
}): ComponentProps<typeof LocationTreeItem> => ({
  location: location,
  id: location.id,
  parentId: location.parentId,
  name: location.name,
  type: location.type.name['en'] ?? '',
  isSelected: location.isSelected,
  isExpanded: location.isExpanded,
  children: location.children.map((child) =>
    getLocationNodeProps({
      onSelectClick,
      onExpandClick,
      onSelectChildrenClick,
      location: child,
    })
  ),
  onExpandClicked: () => onExpandClick(location.id),
  onSelectClicked: () => onSelectClick(location.id),
  onSelectChildrenClick: () => onSelectChildrenClick(location.id),
});

interface LocationTreeProps {
  locations: Location[];
  dispatch: Dispatch<Action>;
}

const LocationTree = ({ locations, dispatch }: LocationTreeProps) => {
  return (
    <>
      {locations.map((location) => (
        <LocationTreeItem
          key={location.id}
          {...getLocationNodeProps({
            onSelectClick: (id) =>
              dispatch({
                type: 'select-clicked',
                data: { id },
              }),
            onExpandClick: (id) =>
              dispatch({
                type: 'expand-clicked',
                data: { id },
              }),
            onSelectChildrenClick: (id) =>
              dispatch({
                type: 'expand-children-clicked',
                data: { id },
              }),
            location,
          })}
        />
      ))}
    </>
  );
};

export default LocationTree;
