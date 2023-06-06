import { cx } from '@emotion/css';
import { Checkbox, VerticalChevron } from 'app/components';
import { AddSquare, MinusSquare } from 'iconsax-react';

import { Location } from './locationsReducer';

interface LocationTreeItemProps {
  id: number;
  parentId: number | null;
  name: string;
  type: string;
  isSelected: boolean;
  isExpanded: boolean;
  children: LocationTreeItemProps[];
  onSelectClicked: () => void;
  onExpandClicked: () => void;
  onSelectChildrenClick: () => void;
  location: Location;
}

const LocationTreeItem = ({
  type,
  name,
  parentId,
  isSelected,
  isExpanded,
  children,
  onSelectClicked,
  onExpandClicked,
  onSelectChildrenClick,
}: LocationTreeItemProps) => {
  const allChildrenSelected = children.every((child) => child.isSelected);

  return (
    <div
      className={cx('flex flex-col mt-[14px]', {
        'ml-3': parentId !== null,
      })}
    >
      <div className="flex items-center">
        <Checkbox id={name} onChange={onSelectClicked} checked={isSelected} />
        <span
          data-tip={`${name} (${type})`}
          className="ml-2 text-sm text-grayscale-primary whitespace-nowrap overflow-hidden overflow-ellipsis"
        >
          {name}
        </span>
        &nbsp;
        <span className="text-grayscale-secondary lowercase text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">{`(${type})`}</span>
        {children.length > 0 && (
          <div className="flex ml-auto">
            <VerticalChevron
              className="w-4 h-4"
              open={isExpanded}
              onClick={onExpandClicked}
            />

            <button
              className="text-grayscale-secondary ml-2 cursor-pointer"
              onClick={onSelectChildrenClick}
              type="button"
            >
              {allChildrenSelected ? (
                <MinusSquare size={13} data-tip="De-select all sub locations" />
              ) : (
                <AddSquare size={13} data-tip="Select all sub locations" />
              )}
            </button>
          </div>
        )}
      </div>
      {isExpanded && (
        <div className="flex flex-col ml-2 border-l-2 border-l-gray-light my-1">
          {children.map((childProps) => (
            <LocationTreeItem key={childProps.id} {...childProps} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationTreeItem;
