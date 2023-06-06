import { css } from '@emotion/css';
import { Empty } from 'app/components';
import { useMissionsTranslation } from 'app/internationalization/hooks';
import React from 'react';

const MissionsEmpty: React.FC = () => {
  const { t } = useMissionsTranslation();

  const CONTENT = {
    image: t('Empty_missions_logo'),
    heading: t('If you haven’t found it yet, keep looking. – Steve Jobs'),
    text: t('In other words, no results found.'),
  };

  return (
    <Empty
      className={css`
        div:first-of-type {
          font-size: 36px;
        }
      `}
      content={CONTENT}
    />
  );
};

export default MissionsEmpty;
