import { cx } from '@emotion/css';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { InfoCircle, Profile2User, Shop } from 'iconsax-react';
import { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import ReactTooltip from 'react-tooltip';
import CheckLineIcon from 'remixicon-react/CheckLineIcon';

interface CompletionProps {
  required?: number;
  disabled?: boolean;
  onClick: (val: number) => void;
}

const Completion = ({ required, disabled, onClick }: CompletionProps) => {
  const { t } = useArticlesTranslation();

  const [open, setOpen] = useState(false);

  const options = [
    {
      id: -1,
      text: t('All members in audience'),
      Icon: Profile2User,
      className: '',
      click: () => onClick(-1),
    },
    {
      id: 1,
      text: t('One member per location'),
      Icon: Shop,
      className: 'rounded-b-lg',
      click: () => onClick(1),
    },
  ];

  useEffect(() => {
    if (open) ReactTooltip.rebuild();
  }, [open]);

  const toggleDropdown = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
      <div className="relative">
        {required === 1 ? (
          <Shop
            size={20}
            className={cx('ml-2', { 'text-grayscale-secondary': open })}
            onClick={toggleDropdown}
          />
        ) : (
          <Profile2User
            size={20}
            className={cx('ml-2', { 'text-grayscale-secondary': open })}
            onClick={toggleDropdown}
          />
        )}
        {open && (
          <div className="absolute bg-white rounded-lg z-50 shadow-lg m-0 bg-clip-padding left-2 top-8 transform -translate-y-2 shadow-atobi p3">
            <div className="flex items-center h-10 pl-4">
              <span className="text-xs text-black font-bold">
                {t('Required completion by')}
              </span>
              <a
                target="_blank"
                rel="noroferrer noreferrer"
                href="https://help.atobi.io"
              >
                <InfoCircle
                  size={16}
                  className="ml-2 text-gray-light"
                  data-tip={t('Help Center')}
                  data-for="requiredHelp"
                />
              </a>
            </div>
            {options.map((opt) => {
              const { id, text, className, Icon, click } = opt;
              return (
                <button
                  key={text}
                  className={cx(
                    'text-sm w-full h-10 px-3 font-normal flex items-center whitespace-nowrap bg-transparent hover:bg-hover-blue text-black',
                    className
                  )}
                  onClick={() => click()}
                >
                  <Icon size={16} className="text-grayscale-secondary mr-2" />
                  <span className="mr-2">{text}</span>

                  <CheckLineIcon
                    size={16}
                    className={cx('text-focus ml-auto', {
                      invisible: required !== id,
                    })}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
      <ReactTooltip
        place="top"
        effect="solid"
        class="react-tooltip"
        id="requiredHelp"
      />
    </OutsideClickHandler>
  );
};

export default Completion;
