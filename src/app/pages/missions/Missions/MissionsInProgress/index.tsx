import { types } from 'app/api/missions';
import { Spinner, SeeMoreButton } from 'app/components';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import React from 'react';

import MissionsCarousel from './MissionsCarousel';

interface MissionsInProgressProps {
  missions: Array<types.Mission>;
  onLabelClick: () => void;
  isLoading: boolean;
}

const MissionsInProgress: React.FC<MissionsInProgressProps> = ({
  missions,
  onLabelClick,
  isLoading,
}) => {
  const { t } = useMissionsTranslation();

  return (
    <div>
      <SeeMoreButton label={t('In Progress')} onClick={onLabelClick} />
      <div className="mt-8">
        {!isLoading ? <MissionsCarousel missions={missions} /> : <Spinner />}
      </div>
    </div>
  );
};

export default MissionsInProgress;
