import { KpiValueFormat } from 'app/api/kpis/types';
import { FC } from 'react';
import CommunityLineIcon from 'remixicon-react/CommunityLineIcon';

import { formatKPIValue } from '../utils';

interface LocationRowProps {
  onClick: () => void;
  name: string;
  total: number;
  kpiValueFormat?: KpiValueFormat;
}

const LocationRow: FC<LocationRowProps> = ({
  onClick,
  name,
  total,
  kpiValueFormat,
}) => (
  <button
    type="button"
    className="rounded-lg shadow-card my-2 flex bg-light overflow-hidden items-center justify-between border border-grayscale-bg-dark cursor-pointer w-full"
    onClick={onClick}
  >
    <div className="flex items-center">
      <div className="p-4 bg-gray-light mr-4 text-grayscale-secondary">
        <CommunityLineIcon />
      </div>
      <div>{name}</div>
    </div>
    <div className="mr-4 font-bold">
      {formatKPIValue(total, kpiValueFormat)}
    </div>
  </button>
);

export default LocationRow;
