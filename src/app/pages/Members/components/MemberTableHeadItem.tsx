import { cx } from '@emotion/css';
import { OrderType } from 'app/api/types';
import { SortByColumn } from 'app/api/user/types';
import {
  Checkbox,
  VerticalChevron,
  FilterDropdown,
  SortIconButton,
} from 'app/components';

import { useMembersContext } from '../context';
interface MemberTableHeadItemProps {
  text: string;
  tabName?: SortByColumn;
  margin?: boolean;
  checkboxChangeHandler?: () => void;
}

const MemberTableHeadItem = ({
  text,
  tabName,
  margin,
  checkboxChangeHandler,
}: MemberTableHeadItemProps) => {
  const { memberFilter, setMemberFiler } = useMembersContext();

  const handleSort = (order: OrderType, sortedByColumn: SortByColumn) => {
    setMemberFiler((prev) => {
      return { ...prev, page: 1, sortedByColumn, order };
    });
  };

  return (
    <th
      className={cx({
        'w-4/12 pl-3': checkboxChangeHandler !== undefined,
      })}
    >
      <div className="flex items-center justify-start mb-4">
        {checkboxChangeHandler && (
          <Checkbox
            id={text}
            onChange={checkboxChangeHandler}
            checked={false}
          />
        )}
        <label
          className={cx('text-sm font-bold text-ellipsis', {
            'ml-4': margin,
          })}
        >
          {text}
        </label>
        {tabName === SortByColumn.name && (
          <SortIconButton
            isActive={memberFilter.sortedByColumn === SortByColumn.name}
            sort={memberFilter.order}
            onChange={(order) => handleSort(order, SortByColumn.name)}
          />
        )}
        {tabName === SortByColumn.date && (
          <SortIconButton
            isActive={memberFilter.sortedByColumn === SortByColumn.date}
            sort={memberFilter.order}
            onChange={(order) => handleSort(order, SortByColumn.date)}
          />
        )}
      </div>
    </th>
  );
};

export default MemberTableHeadItem;
