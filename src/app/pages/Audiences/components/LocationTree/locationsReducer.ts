import { Location as ApiLocation } from 'app/api/auth/types';
import { FullLocationTree, LocationType } from 'app/api/locations/types';
import produce from 'immer';
import { Reducer } from 'react';

type Location = {
  id: number;
  name: string;
  type: LocationType;
  parentId: number | null;
  isSelected: boolean;
  isExpanded: boolean;
  children: Location[];
};

type State = {
  locations: Location[];
  searchText: string;
};

type Action =
  | { type: 'locations-loaded'; data: Location[] }
  | {
      type: 'select-clicked';
      data: { id: number };
    }
  | {
      type: 'expand-clicked';
      data: { id: number };
    }
  | {
      type: 'expand-children-clicked';
      data: { id: number };
    }
  | {
      type: 'search-input';
      data: { text: string };
    }
  | { type: 'toggle-all-selected'; data: { selected: boolean } }
  | { type: 'pre-select'; data: ApiLocation[] };

const getStateLocation = ({
  name,
  children,
  id,
  parentId,
  type,
}: FullLocationTree): Location => ({
  type,
  parentId,
  id,
  name,
  isSelected: false,
  isExpanded: false,
  children: children.map(getStateLocation),
});

const findLocationInNode = (
  id: number,
  location: Location
): Location | undefined => {
  if (location.id === id) return location;
  if (location.children.length === 0) return undefined;

  let foundChild: Location | undefined;
  for (const child of location.children) {
    foundChild = findLocationInNode(id, child);

    if (foundChild) break;
  }

  return foundChild;
};

const findLocation = (
  id: number,
  locations: Location[]
): Location | undefined => {
  for (const location of locations) {
    const foundLocation = findLocationInNode(id, location);
    if (foundLocation) return foundLocation;
  }
};

const markSelectionRecursively = (isSelected: boolean, location: Location) => {
  location.isSelected = isSelected;
  location.children.forEach(markSelectionRecursively.bind(null, isSelected));
};

const preSelect = (apiLocations: ApiLocation[], locations: Location[]) => {
  const ids = apiLocations.map((l) => l.id);
  locations.forEach(function r(location) {
    if (ids.includes(location.id)) {
      location.isSelected = true;
    }

    if (location.children && location.children.length > 0) {
      location.children.forEach(r);
    }
  });
};

const reducer: Reducer<State, Action> = (state, action) => {
  return produce(state, (draft) => {
    if (action.type === 'locations-loaded') draft.locations = action.data;
    if (action.type === 'select-clicked') {
      const foundLocation = findLocation(action.data.id, draft.locations);
      if (foundLocation)
        markSelectionRecursively(!foundLocation.isSelected, foundLocation);
    }
    if (action.type === 'toggle-all-selected') {
      draft.locations.forEach((location) =>
        markSelectionRecursively(action.data.selected, location)
      );
    }
    if (action.type === 'expand-clicked') {
      const foundLocation = findLocation(action.data.id, draft.locations);
      if (foundLocation) {
        foundLocation.isExpanded = !foundLocation.isExpanded;
      }
    }
    if (action.type === 'expand-children-clicked') {
      const foundLocation = findLocation(action.data.id, draft.locations);
      if (foundLocation) {
        foundLocation.isExpanded = true;
        const allChildrenSelected = foundLocation.children.every(
          (child) => child.isSelected
        );
        const value = !allChildrenSelected;
        foundLocation.children.forEach((child) => (child.isSelected = value));
      }
    }
    if (action.type === 'search-input') draft.searchText = action.data.text;

    if (action.type === 'pre-select') {
      preSelect(action.data, draft.locations);
    }
  });
};

export default reducer;
export type { State, Location, Action };
export { reducer, getStateLocation };
