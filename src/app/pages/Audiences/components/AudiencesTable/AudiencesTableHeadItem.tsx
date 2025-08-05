import { cx } from '@emotion/css';
import { Checkbox, FilterDropdown, VerticalChevron } from 'app/components';
import { useAudiencesTranslation } from 'app/internationalization/hooks';
import noop from 'lodash/noop';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { useAudiencesContext } from '../../context';

interface AudienceTableHeadItemProps {
  icon?: string;
  text: string;
  margin?: boolean;
  checkboxChangeHandler?: () => void;
}

const AudienceTableHeadItem = ({
  icon,
  text,
  margin,
  checkboxChangeHandler,
}: AudienceTableHeadItemProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useAudiencesTranslation();

  const { selectedAudiences } = useAudiencesContext();

  return (
    <th
      className={cx({
        'w-6/12 pl-3': checkboxChangeHandler !== undefined,
      })}
    >
      <div className="flex items-center justify-start mb-4">
        {checkboxChangeHandler && (
          <Checkbox
            id={text}
            onChange={checkboxChangeHandler}
            checked={selectedAudiences.length > 0}
          />
        )}

        <label
          className={cx('text-sm font-normal text-grayscale-secondary', {
            'ml-4': margin,
          })}
        >
          {checkboxChangeHandler && selectedAudiences.length > 0
            ? `${t('audienceWithCount', {
                count: selectedAudiences.length,
              })}`
            : text}
        </label>

        {checkboxChangeHandler && (
          <div className="relative flex">
            <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
              <VerticalChevron
                onClick={() => setOpen((isOpen) => !isOpen)}
                open={open}
              />
            </OutsideClickHandler>
            {open && (
              <FilterDropdown
                items={[
                  { text: t('All audiences'), onChange: noop, checked: false },
                  { text: t('Created by me'), onChange: noop, checked: false },
                ]}
              />
            )}
          </div>
        )}
        {icon && (
          <button onClick={() => null}>
            <img src={icon} alt="" />
          </button>
        )}
      </div>
    </th>
  );
};

export default AudienceTableHeadItem;
