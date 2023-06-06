import { ScrollbarContainer } from 'app/components';
import { useAudiencesTranslation } from 'app/internationalization/hooks';
import { Audience } from 'app/store/editor/types';

import AudienceItem from './AudienceItem';

interface SelectedAudiencesProps {
  selectedAudiences: Audience[];
  removeAudience: (audience: Audience) => void;
}

const SelectedAudiences = ({
  selectedAudiences,
  removeAudience,
}: SelectedAudiencesProps) => {
  const { t } = useAudiencesTranslation();
  return (
    <>
      <span className="text-bold">{t('Audiences')}</span>
      <ScrollbarContainer className="max-h-[260px] overflow-y-scroll mt-3">
        {selectedAudiences.map((audience, index) => {
          return (
            <AudienceItem
              key={audience.id}
              audienceId={audience.id}
              onClick={() => removeAudience(audience)}
              index={index}
              name={audience.name}
              members={audience.members ?? 0}
            />
          );
        })}
      </ScrollbarContainer>
    </>
  );
};
export default SelectedAudiences;
