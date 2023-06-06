import { Location } from './locationsReducer';

const getSelectedIds = (locations: Location[]): number[] =>
  locations
    .map((location) => {
      const selectedIds = location.isSelected ? [location.id] : [];
      const childrenSelectedIds = getSelectedIds(location.children);
      return selectedIds.concat(childrenSelectedIds);
    })
    .flat();

export default getSelectedIds;
