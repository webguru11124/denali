import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import { SummaryMode } from 'app/api/kpis/constants';
import { SummaryData, KpiValueFormat } from 'app/api/kpis/types';
import { Spinner } from 'app/components';
import useResizeObserver from 'use-resize-observer';

import useChart from '../../../useChart';
import { formatKPIValue } from '../../../utils';

import Chart from './Chart';

interface ChartCardProps {
  title: string;
  subtitle: string;
  total: number;
  type: string;
  dateFrom?: number;
  dateTo?: number;
  mode: SummaryMode;
  primaryName: string;
  data: SummaryData;
  secondaryName?: string;
  locationId?: number;
  kpiValueFormat?: KpiValueFormat;
}

const Container = styled.div`
  height: 220px;
`;

const ChartCard = ({
  title,
  subtitle,
  total,
  type,
  dateFrom,
  dateTo,
  mode,
  primaryName,
  secondaryName,
  data,
  locationId,
  kpiValueFormat,
}: ChartCardProps) => {
  const { ref, width } = useResizeObserver<HTMLDivElement>();
  const { data: chart, isLoading } = useChart({
    type,
    dateFrom,
    dateTo,
    locationId,
  });
  return (
    <Container className="w-full p-4 rounded-lg shadow-atobi">
      <div className="flex">
        <div className={cx('mr-2 w-full')} ref={ref}>
          <span className="text-lg line-clamp-1">{title}</span>
          <br />
          <div className="h-6">
            <span className="text-sm line-clamp-1">{subtitle}</span>
          </div>
        </div>
        <div className="ml-auto text-xl">
          {formatKPIValue(total, kpiValueFormat)}
        </div>
      </div>
      {chart && !isLoading ? (
        <Chart
          primaryName={primaryName}
          secondaryName={secondaryName}
          chart={chart}
          mode={mode}
          kpiValueFormat={kpiValueFormat}
          data={data}
        />
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default ChartCard;
