import { ApiFile } from 'app/api/types';
import { Button, Gallery } from 'app/components';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import React from 'react';

import TitleAndContent from '../TitleAndContent';
import useCompleteGenericActivity from '../useCompleteGenericActivity';

interface SimpleProps {
  onCompletedActivityClick: () => void;
  name: string;
  content: string;
  activityId: number;
  completed: boolean;
  files: Array<ApiFile>;
}

const Simple: React.FC<SimpleProps> = ({
  onCompletedActivityClick,
  name,
  content,
  activityId,
  completed,
  files,
}) => {
  const { mutate: completeActivity } = useCompleteGenericActivity(activityId);
  const { t } = useMissionsTranslation();
  return (
    <div className="row">
      <div className="col-12">
        <TitleAndContent name={name} content={content} id={activityId} />
        <div className="mt-3">
          <Gallery files={files} />
        </div>
      </div>
      <div className="col-6 offset-3 mt-12">
        <Button
          variant="primary"
          onClick={() => {
            if (!completed) {
              completeActivity();
            }
            onCompletedActivityClick();
          }}
          type="button"
        >
          {t('Next')}
        </Button>
      </div>
    </div>
  );
};

export default Simple;
