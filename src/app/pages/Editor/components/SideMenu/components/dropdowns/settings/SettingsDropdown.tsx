import { cx } from '@emotion/css';
import Switch from 'app/components/Switch';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { useState } from 'react';
import CalendarLineIcon from 'remixicon-react/CalendarLineIcon';

import DropdownContainer from '../DropdownContainer';

const SettingsDropdown = () => {
  const [archiveDateSelected, setArchiveDateSelected] = useState(false);
  const { t } = useArticlesTranslation();
  return (
    <DropdownContainer>
      <span className="flex text-lg text-grayscale-primary">
        {t('Article Settings')}
      </span>
      <span className="flex text-grayscale-secondary font-normal">
        {t('Publish Date')}
      </span>
      <div className="flex justify-between items-center border border-gray-light rounded text-grayscale-secondary text-sm p-3 mt-3">
        <span>{t('Undefined')}</span>
        <CalendarLineIcon />
      </div>

      <div className="flex items-center justify-between mt-5">
        <span className="mr-3 text-grayscale-secondary font-normal">
          {t('Archive Date')}
        </span>
        <Switch
          onChange={() => setArchiveDateSelected((prev) => !prev)}
          checked={archiveDateSelected}
        />
      </div>
      <div
        className={cx(
          'justify-between items-center border border-gray-light rounded text-grayscale-secondary text-sm p-3 mt-3 flex',
          { hidden: !archiveDateSelected }
        )}
      >
        <span>{t('Undefined')}</span>
        <CalendarLineIcon />
      </div>
    </DropdownContainer>
  );
};

export default SettingsDropdown;
