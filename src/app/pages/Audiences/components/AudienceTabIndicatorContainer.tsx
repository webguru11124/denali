import TabIndicator from 'app/components/TabIndicator';
import { useAudiencesTranslation } from 'app/internationalization/hooks';

import { AudienceTabFilter, useAudiencesContext } from '../context';

const AudienceTabsIndicatorContainer = () => {
  const { setAudienceTabFilter, audienceTabFilter } = useAudiencesContext();
  const { t } = useAudiencesTranslation();

  const tabs: { [key in AudienceTabFilter]: string } = {
    available: t('Available'),
  };

  return (
    <div className="flex">
      {Object.keys(tabs).map((key, index) => {
        const newKey = key as AudienceTabFilter;
        return (
          <TabIndicator
            key={index}
            label={tabs[newKey]}
            selected={newKey === audienceTabFilter}
            onClick={() => setAudienceTabFilter(newKey)}
          />
        );
      })}
    </div>
  );
};

export default AudienceTabsIndicatorContainer;
