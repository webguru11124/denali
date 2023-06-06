import { Audience } from 'app/api/audiences/types';
import { Input2, PageLoader, ScrollbarContainer } from 'app/components';
import { useAudiencesTranslation } from 'app/internationalization/hooks';
import { Eye, Global } from 'iconsax-react';
import debounce from 'lodash/debounce';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

interface AudiencesDropdownProps {
  audiences: Audience[] | undefined;
  isLoading: boolean;
  onSearch: (value: string) => void;
  addAudience: (audience: Audience) => void;
}

const AudiencesDropdown = ({
  audiences,
  isLoading,
  onSearch,
  addAudience,
}: AudiencesDropdownProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useAudiencesTranslation();

  const debounceSearch = debounce((value) => onSearch(value), 500);

  return (
    <div className="relative flex-1">
      <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
        <Input2
          placeholder={t('Search for Audience')}
          onChange={(e) => debounceSearch(e.target.value)}
          onClear={() => debounceSearch('')}
          onFocus={() => setOpen(true)}
          isSearch={true}
        />

        {open && (
          <div className="border border-gray-light rounded w-[224px] shadow-atobi absolute bg-white overflow-y-auto z-10 pl-2 py-4">
            {isLoading && (
              <div className="h-[220px]">
                <PageLoader />
              </div>
            )}

            {audiences && audiences.length > 0 && (
              <>
                <span className="text-sm font-bold ml-2">{t('Audience')}</span>
                <ScrollbarContainer className="h-[220px] mr-1">
                  {audiences.map((audience) => (
                    <button
                      key={audience.id}
                      className="flex items-center w-full mt-3 hover:bg-focus-background rounded-sm"
                      onClick={() => {
                        addAudience(audience);
                        setOpen(false);
                      }}
                    >
                      <div className="w-8 h-8 flex items-center justify-center  text-grayscale-secondary rounded-lg border border-gray-light bg-white ml-2">
                        <Global size={24} />
                      </div>
                      <div className="flex flex-col justify-center min-w-0 ml-3">
                        <div className="flex mb-0.5">
                          <span className="text-sm text-ellipsis whitespace-nowrap overflow-hidden ">
                            {audience.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-start text-sm text-grayscale-secondary">
                          <Eye size={16} />
                          <span className="ml-1">
                            {t('{{count}} Members', {
                              count: audience.usersCount ?? 0,
                            })}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </ScrollbarContainer>
              </>
            )}

            {(!audiences || audiences.length === 0) && !isLoading && (
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

export default AudiencesDropdown;
