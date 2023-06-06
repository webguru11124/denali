import { cx } from '@emotion/css';
import { ScrollbarContainer } from 'app/components';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { actions as editorActions, selectors } from 'app/store/editor';
import { GlobalEdit, LocationTick } from 'iconsax-react';
import { useDispatch, useSelector } from 'react-redux';

interface LanguageDropdownProps {
  onLanguageSettingsClick: VoidFunction;
  beforeLanguageChange?: (code: string) => void;
  selectedLanguageCode?: string;
  userId?: number;
  articleOwner: number;
}

const LanguageDropdown = ({
  articleOwner,
  selectedLanguageCode,
  userId,
  onLanguageSettingsClick,
  beforeLanguageChange,
}: LanguageDropdownProps) => {
  const { t } = useArticlesTranslation();
  const dispatch = useDispatch();
  const selectedLanguages = useSelector(selectors.getSelectedLanguages);

  const disabled = articleOwner !== userId;

  return (
    <div
      className="flex flex-col max-w-[250px] bg-white rounded p-1 absolute top-8 text-sm text-grayscale-secondary 
              whitespace-nowrap cursor-default transform translate-y-5 border border-gray-light"
    >
      <ScrollbarContainer className="max-h-[500px]">
        {selectedLanguages.length > 0 &&
          selectedLanguages.map((language, idx) => (
            <button
              key={`${language.code}${idx}`}
              onClick={() => {
                if (beforeLanguageChange) {
                  beforeLanguageChange(language.code);
                  return;
                }

                dispatch(editorActions.setActiveLanguage(language.code));
              }}
              className={cx(
                'flex items-center w-full hover:bg-focus-background rounded-sm py-2 px-2',
                {
                  'text-focus bg-focus-background':
                    language.code === selectedLanguageCode,
                }
              )}
            >
              <div className="flex items-center justify-center border-r pr-2">
                <span className="border rounded-sm w-6 h-6">
                  {language.code.toUpperCase()}
                </span>
              </div>
              <div
                className={cx('flex items-start px-2 overflow-hidden', {
                  'border-r': language.isDefault,
                })}
              >
                <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                  {language.name}
                </span>
              </div>
              {language.isDefault && (
                <div className={cx('flex items-center px-2')}>
                  <LocationTick size={16} />
                  <span className="ml-1">{t('Main')}</span>
                </div>
              )}
            </button>
          ))}
      </ScrollbarContainer>

      {selectedLanguages.length > 0 && (
        <hr className="my-2 border border-gray-light" />
      )}
      <button
        onClick={onLanguageSettingsClick}
        className={cx('flex items-center justify-start rounded-sm h-7.5', {
          'hover:bg-focus-background': !disabled,
          'text-gray-dark': disabled,
        })}
        disabled={disabled}
      >
        <GlobalEdit className="ml-2 mr-1" />
        {t('Language Settings')}
      </button>
    </div>
  );
};

export default LanguageDropdown;
