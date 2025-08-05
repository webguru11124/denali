import { SettingsPopup } from 'app/components';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import React from 'react';
import { RemixiconReactIconComponentType } from 'remixicon-react';
import DownloadIcon from 'remixicon-react/DownloadCloudLineIcon';

interface ControlButtonProps {
  Icon: RemixiconReactIconComponentType;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface MissionControlsProps {
  onReportDownload: () => void;
  isDownloading: boolean;
  onReportModalDisplay: () => void;
}

const ControlButton: React.FC<ControlButtonProps> = ({
  label,
  Icon,
  onClick,
  disabled,
}) => (
  <button
    disabled={disabled}
    type="button"
    onClick={onClick}
    className="flex items-center w-full pr-5 pl-5 pt-5 pb-4"
  >
    <span className="mr-4">
      <Icon className="w-5 h-5" />
    </span>
    <span className="text-sm">{label}</span>
  </button>
);

const MissionControls: React.FC<MissionControlsProps> = ({
  onReportDownload,
  isDownloading,
  onReportModalDisplay,
}) => {
  const { t } = useMissionsTranslation();

  return (
    <SettingsPopup className="transform lg:-translate-x-1/2 -translate-x-full mt-3 left-1/2">
      <ControlButton
        onClick={onReportDownload}
        Icon={DownloadIcon}
        label={t('Download Report')}
        disabled={isDownloading}
      />
      <ControlButton
        onClick={onReportModalDisplay}
        Icon={DownloadIcon}
        label={t('See Previous Reports')}
      />
    </SettingsPopup>
  );
};

export default MissionControls;
