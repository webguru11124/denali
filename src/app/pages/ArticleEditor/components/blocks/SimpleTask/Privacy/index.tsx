import { cx } from '@emotion/css';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { Eye, EyeSlash, InfoCircle } from 'iconsax-react';
import { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import ReactTooltip from 'react-tooltip';
import CheckLineIcon from 'remixicon-react/CheckLineIcon';

interface PrivacyProps {
  isPublic?: boolean;
  disabled?: boolean;
  onClick: (isPublic: boolean) => void;
}

const Privacy = ({ isPublic, disabled, onClick }: PrivacyProps) => {
  const { t } = useArticlesTranslation();

  const [open, setOpen] = useState(false);

  const options = [
    {
      publicVisibility: true,
      text: t('Public to audience members'),
      Icon: Eye,
      className: '',
      click: () => onClick(true),
    },
    {
      publicVisibility: false,
      text: t('Private to article editors'),
      Icon: EyeSlash,
      className: 'rounded-b-lg',
      click: () => onClick(false),
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
      <div className="relative mr-2">
        {isPublic || isPublic === undefined ? (
          <Eye
            size={20}
            className={cx({ 'text-grayscale-secondary': open })}
            onClick={toggleDropdown}
          />
        ) : (
          <EyeSlash
            size={20}
            className={cx({ 'text-grayscale-secondary': open })}
            onClick={toggleDropdown}
          />
        )}
        {open && (
          <div className="absolute bg-white rounded-lg z-50 shadow-lg m-0 bg-clip-padding left-2 top-8 transform -translate-y-2 shadow-atobi p3">
            <div className="flex items-center h-10 pl-4">
              <span className="text-xs text-black font-bold">
                {t('Answer Visibility')}
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
                  data-for="privacyHelp"
                />
              </a>
            </div>
            {options.map((opt) => {
              const { publicVisibility, text, className, Icon, click } = opt;
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
                      invisible: publicVisibility !== isPublic,
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
        id="privacyHelp"
      />
    </OutsideClickHandler>
  );
};

export default Privacy;
