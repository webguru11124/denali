import { ActivityStatus } from 'app/api/missions/constants';
import { ApiFile } from 'app/api/types';
import { Button, Gallery } from 'app/components';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import lightbulbIcon from 'assets/icons/lightbulb.png';
import React, { useState } from 'react';

import TitleAndContent from '../TitleAndContent';
import useCompleteGenericActivity from '../useCompleteGenericActivity';

interface FilesProps {
  name: string;
  content: string;
  files: Array<ApiFile>;
  onCompletedActivityClick: () => void;
  activityId: number;
  completed: ActivityStatus;
}

const Files: React.FC<FilesProps> = ({
  name,
  files,
  content,
  onCompletedActivityClick,
  activityId,
  completed,
}) => {
  const [inspectedFiles, setInspectedFiles] = useState<Array<number>>(
    completed === ActivityStatus.completed ? files.map(({ id }) => id) : []
  );
  const { t } = useMissionsTranslation();
  const { mutate: completeActivity } = useCompleteGenericActivity(activityId);
  // filter files by ID to identify downloaded files
  const allFilesDownloaded: boolean =
    files.filter(({ id }) => inspectedFiles.includes(id)).length ===
    files.length;

  const handleFileInspected = (fileId: number) => {
    setInspectedFiles((prev) => {
      if (prev.includes(fileId)) return prev;

      return [...prev, fileId];
    });
  };

  return (
    <div>
      <TitleAndContent name={name} content={content} id={activityId} />
      <div className="row mt-4">
        <div className="2xl:col-8 col-12 mb-3">
          <div className="flex shadow-atobi rounded p-1 text-sm items-center">
            <img src={lightbulbIcon} alt="lightbulb" className="h-6 w-6 mr-1" />
            {t(
              'To complete this activity, preview the images, videos, and/or attached files.'
            )}
          </div>
        </div>
        <div className="col-12">
          <Gallery
            displayInspectedIndicator
            onFileInspected={handleFileInspected}
            inspectedFilesIds={inspectedFiles}
            files={files}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6 offset-3 mt-12">
          <Button
            disabled={!allFilesDownloaded}
            onClick={() => {
              completeActivity();
              onCompletedActivityClick();
            }}
            type="button"
            variant="primary"
          >
            {t('Done')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Files;
