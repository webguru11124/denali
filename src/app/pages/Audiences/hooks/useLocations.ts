import useGetLocationsQuery from 'app/api/locations/hooks/useLocationsQuery';
import { FullLocationTree } from 'app/api/locations/types';
import { useEffect, useState } from 'react';

const useLocations = () => {
  const { data: locations, error, isLoading } = useGetLocationsQuery();
  const [locationsTree, setLocationsTree] = useState<Array<FullLocationTree>>();

  useEffect(() => {
    if (!locations) return;
    const idToLocationMap: Record<number, FullLocationTree> = {};

    locations.forEach(
      (location) =>
        (idToLocationMap[location.id] = { ...location, children: [] })
    );
    const dataTree: Array<FullLocationTree> = [];
    locations.forEach((location) => {
      if (location.parentId === null || location.parentId === undefined) {
        dataTree.push(idToLocationMap[location.id]);
      } else {
        idToLocationMap[location.parentId].children.push(
          idToLocationMap[location.id]
        );
      }
    });

    setLocationsTree(dataTree);
  }, [locations]);

  return {
    locationsTree,
    locations,
    error,
    isLoading,
  };
};

export default useLocations;
