import { Checkbox, ScrollbarContainer } from 'app/components';
import Input from 'app/components/Input';
import { useISOLanguages, useSelector } from 'app/hooks';
import { useComponentsTranslation } from 'app/internationalization/hooks';
import DropdownInput from 'app/pages/Audiences/components/DropdownInput';
import { actions, selectors } from 'app/store/editor';
import { Language } from 'app/store/editor/types';
import { Translate } from 'iconsax-react';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';

const LanguagesDropdown = ({ articleOwner }: { articleOwner: number }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const languages = useISOLanguages({ search });

  const { t } = useComponentsTranslation();

  const dispatch = useDispatch();
  const selectedLanguages = useSelector(selectors.getSelectedLanguages);

  const onChange = (checked: boolean, language: Language) => {
    dispatch(
      actions.updateCollaboratorLanguages({
        code: language.code,
        id: articleOwner,
      })
    );

    if (checked) {
      dispatch(actions.addLanguage(language));
      return;
    }

    dispatch(actions.removeLanguage(language.code));
  };

  return (
    <div className="mt-4 relative">
      <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
        <DropdownInput
          className="w-full"
          Icon={Translate}
          open={open}
          text={'Languages'}
          totalSelected={selectedLanguages.length}
          onClick={() => setOpen((prev) => !prev)}
        />

        {open && (
          <div className="border border-gray-light rounded shadow-atobi right-0 left-0 absolute max-h-[394px] bg-white overflow-y-auto z-10">
            <div className="mr-1">
              <div className="mb-4.5 px-3 pt-3">
                <Input
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  placeholder={`${t('Search...')}`}
                  name="search"
                  className="h-10"
                  containerClassName="h-10"
                  inputPaddingClass="py-2"
                />
              </div>

              <ScrollbarContainer className="max-h-[282px] px-3 pb-3">
                <div className="flex flex-col">
                  {languages.map((language) => (
                    <div className="flex mt-4.5" key={language.name}>
                      <Checkbox
                        id={language.code}
                        checked={selectedLanguages
                          .map((sl) => sl.code)
                          .includes(language.code)}
                        onChange={(e) =>
                          onChange(e.target.checked, {
                            name: language.name,
                            code: language.code,
                            isDefault: false,
                            active: false,
                          })
                        }
                      />
                      <span className="ml-2 text-ellipsis whitespace-nowrap overflow-hidden">
                        {language.name}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollbarContainer>
            </div>
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default LanguagesDropdown;
