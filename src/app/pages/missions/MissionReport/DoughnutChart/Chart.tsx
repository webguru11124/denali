import { css, cx } from '@emotion/css';
import styled from '@emotion/styled';
import { Spinner } from 'app/components';
import config from 'app/config';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

interface DoughnutChartProps {
  notStarted: number;
  inProgress: number;
  completed: number;
  isLoading: boolean;
}

interface StatsRowProps {
  color: string;
  totalAmount: number;
  activitiesAmount: number;
  label: string;
}

const COLORS = {
  notStarted: config.colors.cream,
  inProgress: config.colors.warning,
  completed: config.colors.success,
};

const ChartContainer = styled.div`
  width: 208px;
`;

const Container = styled.div`
  height: 208px;
`;

const StatsRow: React.FC<StatsRowProps> = ({
  color,
  label,
  totalAmount,
  activitiesAmount,
}) => (
  <div>
    <div className="flex items-center">
      <div
        className={cx(
          'h-4 w-4',
          css`
            background-color: ${color};
            border-radius: 2px;
          `
        )}
      />
      <p className="ml-1 font-bold text-base">
        {Math.round((activitiesAmount / totalAmount) * 100)}%
      </p>
    </div>
    <div className="flex items-center text-grayscale-secondary mt-1">
      <p className="text-sm">{label}</p>
      <p className="text-xs ml-2">
        ({activitiesAmount} / {totalAmount})
      </p>
    </div>
  </div>
);

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  notStarted,
  inProgress,
  completed,
  isLoading,
}) => {
  const { t } = useMissionsTranslation();

  const totalAmount = notStarted + inProgress + completed;

  return (
    <div className="shadow-atobi pt-10 pb-12 rounded-lg ">
      <Container className="flex items-center justify-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <ChartContainer>
              <PieChart
                lineWidth={35}
                data={[
                  {
                    value: notStarted,
                    color: COLORS.notStarted,
                  },
                  {
                    value: inProgress,
                    color: COLORS.inProgress,
                  },
                  {
                    value: completed,
                    color: COLORS.completed,
                  },
                ]}
              />
            </ChartContainer>
            <div className="ml-16">
              <StatsRow
                label={t('not started')}
                totalAmount={totalAmount}
                activitiesAmount={notStarted}
                color={COLORS.notStarted}
              />
              <div className="mt-6">
                <StatsRow
                  label={t('in progress')}
                  totalAmount={totalAmount}
                  activitiesAmount={inProgress}
                  color={COLORS.inProgress}
                />
              </div>
              <div className="mt-6">
                <StatsRow
                  label={t('completed')}
                  totalAmount={totalAmount}
                  activitiesAmount={completed}
                  color={COLORS.completed}
                />
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default DoughnutChart;
