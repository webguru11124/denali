import { cx } from '@emotion/css';
import config from 'app/config';
import { IconProps, Clock, DocumentCopy, EyeSlash, Sort } from 'iconsax-react';
import { FunctionComponent } from 'react';

type Icon = FunctionComponent<IconProps>;

const FilterAndSort = () => {
  const FilterIcon = ({
    IconSax,
    title,
    active,
  }: {
    IconSax: Icon;
    title: string;
    active?: boolean;
  }) => {
    return (
      <div className="filter-item flex p-1 items-center gap-2 hover:bg-focus-background hover:text-grayscale-primary rounded-xs cursor-pointer">
        <IconSax color={config.colors['gray-dark']} />
        <span
          className={cx({
            'text-grayscale-secondary': !active,
            'text-focus font-bold': active,
          })}
        >
          {title}
        </span>
      </div>
    );
  };

  return (
    <div className="inline-flex flex-col gap-4">
      <div className="inline-flex flex-col gap-2">
        <span className="font-bold text-sm mb-2">Filter By Progress</span>
        <FilterIcon IconSax={DocumentCopy} title="All" />
        <FilterIcon IconSax={EyeSlash} title="Unseen" active />
        <span className="border-b-[1px] border-b-gray-light h-1 w-34 mt-2" />
      </div>
      <div className="inline-flex flex-col gap-2">
        <span className="font-bold text-sm mb-2">Sort By Date</span>
        <FilterIcon IconSax={Sort} title="Newest first" active />
        <FilterIcon IconSax={Clock} title="Action Deadline" />
      </div>
    </div>
  );
};

export default FilterAndSort;
