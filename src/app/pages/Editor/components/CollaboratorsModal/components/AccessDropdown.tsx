import { cx } from '@emotion/css';
import { VerticalChevron, Checkbox, ScrollbarContainer } from 'app/components';
import { useIsVisible } from 'app/hooks';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { Collaborator, Language } from 'app/store/editor/types';
import { LocationTick, Trash } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';
import { Popover } from 'react-tiny-popover';

interface AccessDropdownProps {
  collaborator: Collaborator;
  languages: Language[];
  onChange: (id: number, code: string) => void;
  removeAccess: VoidFunction;
  parentRef: HTMLDivElement;
}

const AccessDropdown = ({
  collaborator,
  languages,
  onChange,
  removeAccess,
  parentRef,
}: AccessDropdownProps) => {
  const { t } = useArticlesTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const isVisible = useIsVisible(ref);

  useEffect(() => {
    if (!isVisible) setOpen(false);
  }, [isVisible]);

  const selectedLanguagesLabel = (): string => {
    if (collaborator.languages.length === 0) return 'No Access';

    if (languages.length === collaborator.languages.length) {
      return 'Full Access';
    }

    const languagesString: string[] = [];

    languages.forEach((l) => {
      if (collaborator.languages.includes(l.code)) languagesString.push(l.name);
    });

    return languagesString.join(', ');
  };

  return (
    <div className="w-1/2">
      <Popover
        parentElement={parentRef}
        containerClassName="z-999"
        isOpen={open}
        positions={['bottom']}
        align="end"
        onClickOutside={() => setOpen(false)}
        content={
          <div className="border border-gray-light rounded  shadow-atobi bg-white">
            <ScrollbarContainer className="max-h-[120px] xl:max-h-[140px] 2xl:max-h-[200px] px-4.5 pt-4">
              <div className="flex-col">
                {languages &&
                  languages.map((language, index) => {
                    return language.isDefault ? (
                      <div
                        key={`${language.code}${language.active}`}
                        className={cx('flex items-center', {
                          'mt-3': index !== 0,
                        })}
                      >
                        <Checkbox
                          id={language.name}
                          checked={collaborator.languages.includes(
                            language.code
                          )}
                          onChange={() =>
                            onChange(collaborator.id, language.code)
                          }
                        />
                        <span className="text-sm text-grayscale-primary ml-2.5">
                          {language.name}
                        </span>

                        <div className="flex items-center border-l border-grayscale-primary text-sm text-grayscale-primary ml-2">
                          <LocationTick size={16} className="ml-2" />
                          <span className="ml-1">{t('Main')}</span>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={`${language.code}${language.active}`}
                        className={cx('flex', { 'mt-3': index !== 0 })}
                      >
                        <Checkbox
                          id={language.name}
                          checked={collaborator.languages.includes(
                            language.code
                          )}
                          onChange={() =>
                            onChange(collaborator.id, language.code)
                          }
                        />
                        <span className="text-sm text-grayscale-primary ml-2.5">
                          {language.name}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </ScrollbarContainer>
            <div className="px-4.5 py-2 text-error text-sm border-t border-gray-light">
              <button className="flex" onClick={removeAccess}>
                <Trash size={20} />
                <span className="ml-2">{t('Remove Access')}</span>
              </button>
            </div>
          </div>
        }
      >
        <div className="flex justify-end relative h-full">
          <div className="flex">
            <span
              className="text-sm text-grayscale-primary line-clamp-1"
              ref={ref}
            >
              {selectedLanguagesLabel()}
            </span>
            <VerticalChevron
              open={open}
              onClick={() => setOpen((isOpen) => !isOpen)}
              className="w-4 h-4 ml-1"
            />
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default AccessDropdown;
