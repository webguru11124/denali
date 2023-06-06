import { ScrollbarContainer } from 'app/components';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { selectors } from 'app/store/editor';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import AccessDropdown from './AccessDropdown';
import CollaboratorItem from './CollaboratorItem';

interface SelectedCollaboratorsProps {
  articleOwner: number | null;
  removeCollaborator: (id: number) => void;
  languagePermissionChange: (id: number, code: string) => void;
}

const SelectedCollaborators = ({
  articleOwner = 0,
  removeCollaborator,
  languagePermissionChange,
}: SelectedCollaboratorsProps) => {
  const { t } = useArticlesTranslation();
  const selectedCollaborators = useSelector(selectors.getSelecteCollaborators);
  const selectedLanguages = useSelector(selectors.getSelectedLanguages);

  const [ref, setRef] = useState<HTMLDivElement | null>();

  return (
    <>
      {selectedCollaborators.length > 0 && (
        <div className="mt-4 h-[200px]" ref={(r) => setRef(r)}>
          <span className="text-bold">{t('Members')}</span>
          <ScrollbarContainer className="max-h-[200px] overflow-y-scroll mt-3">
            {selectedCollaborators.map((collaborator, index) => {
              return (
                <CollaboratorItem
                  key={collaborator.id}
                  index={index}
                  collaborator={collaborator}
                >
                  {collaborator.id === articleOwner ? (
                    <span className="text-sm text-grayscale-secondary text-ellipsis whitespace-nowrap overflow-hidden ml-auto">
                      {t('Article Owner')}
                    </span>
                  ) : (
                    <>
                      {ref && (
                        <AccessDropdown
                          collaborator={collaborator}
                          languages={selectedLanguages}
                          removeAccess={() =>
                            removeCollaborator(collaborator.id)
                          }
                          onChange={languagePermissionChange}
                          parentRef={ref}
                        />
                      )}
                    </>
                  )}
                </CollaboratorItem>
              );
            })}
          </ScrollbarContainer>
        </div>
      )}
    </>
  );
};

export default SelectedCollaborators;
