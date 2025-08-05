import { Empty as EmptyComponent } from 'app/components';
import { useKpisTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';

const Empty: FC = () => {
  const { t } = useKpisTranslation();
  const CONTENT = {
    image: t('Empty_rankings_logo'),
    heading: t('If you haven’t found it yet, keep looking. – Steve Jobs'),
    text: t('In other words, no results found.'),
  };

  return <EmptyComponent content={CONTENT} />;
};

export default Empty;
