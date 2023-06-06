import styled from '@emotion/styled';
import { types } from 'app/api/missions';
import { SeeMoreButton } from 'app/components';
import config from 'app/config';
import { useScreenBreakpoint } from 'app/hooks';
import chunk from 'lodash/chunk';
import React, { useState } from 'react';
import ArrowLeftIcon from 'remixicon-react/ArrowLeftSLineIcon';
import ArrowRightIcon from 'remixicon-react/ArrowRightSLineIcon';

import MissionsCarousel from './MissionsCarousel';

interface MissionsListProps {
  label: string;
  missions: Array<types.Mission>;
  onLabelClick: () => void;
  isLoading: boolean;
}

const ControlsContainer = styled.div`
  padding-left: 10px;
`;

const Container = styled.div`
  width: 710px;
  @media (min-width: ${config.screenSizes['2xl']}) {
    width: 950px;
  }
  .control-dots {
    margin: 0 !important;
  }
`;

const MissionsList: React.FC<MissionsListProps> = ({
  label,
  missions,
  onLabelClick,
  isLoading,
}) => {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const breakpoint = useScreenBreakpoint();
  const chunkedMissions = chunk<types.Mission>(
    missions,
    !['2xl'].includes(breakpoint) ? 3 : 4
  );

  return (
    <Container>
      <ControlsContainer className="flex items-center mb-8">
        <SeeMoreButton label={label} onClick={onLabelClick} />
        {chunkedMissions.length > 1 && (
          <div className="ml-auto text-grayscale-secondary mr-2">
            <button
              onClick={() => {
                setSelectedSlide((prev) => {
                  if (prev === 0) {
                    return chunkedMissions.length - 1;
                  }

                  return prev - 1;
                });
              }}
              className="p-2 rounded-lg shadow-card"
              type="button"
            >
              <ArrowLeftIcon />
            </button>
            <button
              onClick={() => {
                setSelectedSlide((prev) => {
                  if (prev === chunkedMissions.length - 1) {
                    return 0;
                  }

                  return prev + 1;
                });
              }}
              className="p-2 rounded-lg shadow-card"
              type="button"
            >
              <ArrowRightIcon />
            </button>
          </div>
        )}
      </ControlsContainer>
      <div>
        <MissionsCarousel
          isLoading={isLoading}
          chunkedMissions={chunkedMissions}
          selectedSlide={selectedSlide}
        />
      </div>
    </Container>
  );
};

export default MissionsList;
