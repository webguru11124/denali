import { useState } from 'react';

interface TagCategory {
  id: string;
  label: string;
  value: string;
}

type UseCategoriesState = () => [Array<string>, (tag: TagCategory) => void];

const useCategoriesState: UseCategoriesState = () => {
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>(
    []
  );

  return [
    selectedCategories,
    ({ id }: TagCategory) => {
      setSelectedCategories((prevState: Array<string>) => {
        if (prevState.includes(id)) {
          return prevState.filter((tag) => tag !== id);
        }

        return [...prevState, id];
      });
    },
  ];
};

export default useCategoriesState;
