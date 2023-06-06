import { ScrollbarContainer } from 'app/components';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { selectors } from 'app/store/editor';
import { LocationTick } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import LanguageSettings from './LanguageSettings';

const ActiveLanguages = () => {
  const { t } = useArticlesTranslation();
  const languages = useSelector(selectors.getSelectedLanguages);
  const collaborators = useSelector(selectors.getSelecteCollaborators);

  const [ref, setRef] = useState<HTMLDivElement | null>();

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [languages]);

  return (
    <div
      className="border border-gray-light rounded py-4 px-4 mt-3 h-[250px]"
      ref={(r) => setRef(r)}
    >
      <span className="font-bold">{t('Active Languages')}</span>
      <ScrollbarContainer className="max-h-[180px] px-3 pb-3">
        {languages.map((language) => (
          <div key={language.code} className="flex items-center mt-4.5 w-full">
            <span>{language.name}</span>
            {language.isDefault && (
              <>
                <LocationTick
                  size={16}
                  className="text-grayscale-secondary ml-2 mr-1"
                />
                <span className="text-grayscale-secondary">{t('Main')}</span>
              </>
            )}

            {collaborators &&
              collaborators.map((collaborator, index) => {
                if (collaborator.languages.includes(language.code)) {
                  return (
                    <img
                      key={`${collaborator.fullName}${index}`}
                      src={collaborator.avatar}
                      alt="avatar"
                      className="w-4 h-4 ml-2"
                      data-tip={collaborator.fullName}
                    />
                  );
                }
              })}
            {ref && <LanguageSettings language={language} parentRef={ref} />}
          </div>
        ))}
      </ScrollbarContainer>
    </div>
  );
};

export default ActiveLanguages;
