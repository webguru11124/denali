import { Empty as EmptyComponent } from 'app/components';
import { useVMGuidesTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';

const Empty: FC = () => {
  const { t } = useVMGuidesTranslation();
  const CONTENT = {
    image: t('Empty_icon_landing'),
    heading: t('No Visual Guides'),
    text: t(
      'In Visual Guides, managers can share visual guidelines. Follow the guidelines and share inspiration across cities and countries.'
    ),
  };

  return <EmptyComponent content={CONTENT} />;
};

export default Empty;
