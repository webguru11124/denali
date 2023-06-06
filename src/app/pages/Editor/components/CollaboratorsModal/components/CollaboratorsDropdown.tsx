import { ArticleCollaborator } from 'app/api/articleCollaborators/types';
import { Input2, PageLoader, ScrollbarContainer } from 'app/components';
import { useArticlesTranslation } from 'app/internationalization/hooks';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

interface CollaboratorsDropdownProps {
  collaborators: ArticleCollaborator[] | undefined;
  isLoading: boolean;
  addCollaborator: (collaborator: ArticleCollaborator) => void;
}

const CollaboratorsDropdown = ({
  collaborators,
  isLoading,
  addCollaborator,
}: CollaboratorsDropdownProps) => {
  const { t } = useArticlesTranslation();

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative flex-1">
      <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
        <Input2
          placeholder="Search by name"
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onClear={() => setSearchQuery('')}
          isSearch={true}
        />

        {open && (
          <div className="border border-gray-light rounded w-[224px] shadow-atobi absolute bg-white overflow-y-auto z-10 pl-2 py-4">
            {isLoading && (
              <div className="h-[220px]">
                <PageLoader />
              </div>
            )}

            {collaborators && collaborators.length > 0 && (
              <>
                <span className="text-sm font-bold ml-2">{t('Members')}</span>
                <ScrollbarContainer className="h-[220px] mr-1">
                  {collaborators.map((collaborator) => {
                    if (collaborator.fullName.includes(searchQuery)) {
                      return (
                        <button
                          key={collaborator.id}
                          className="flex items-center w-full mt-3 hover:bg-focus-background rounded-sm"
                          onClick={() => {
                            addCollaborator(collaborator);
                            setOpen(false);
                          }}
                        >
                          <div className="w-8 h-8 flex items-center justify-center  text-grayscale-secondary rounded border border-gray-light bg-white ml-2">
                            <img
                              className="rounded"
                              src={collaborator.avatars.small}
                              alt="Avatar"
                            />
                          </div>
                          <div className="flex flex-col justify-center min-w-0 ml-3">
                            <div className="flex mb-0.5">
                              <span className="text-sm text-ellipsis whitespace-nowrap overflow-hidden ">
                                {collaborator.fullName}
                              </span>
                            </div>
                            <div className="flex mb-0.5">
                              <span className="text-sm text-grayscale-secondary text-ellipsis whitespace-nowrap overflow-hidden ">
                                {collaborator.email}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    }
                  })}
                </ScrollbarContainer>
              </>
            )}

            {(!collaborators || collaborators.length === 0) && !isLoading && (
              <div className="flex justify-center items-center h-[220px]">
                {t('No results')}
              </div>
            )}
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default CollaboratorsDropdown;
