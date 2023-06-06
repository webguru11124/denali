import { useComponentsTranslation } from 'app/internationalization/hooks';
import { FC } from 'react';

const Seperator: FC = () => {
  const { t } = useComponentsTranslation();

  return (
    <span className="mx-1 text-gray-dark">{t('Breadcrumb_seperator')}</span>
  );
};

export default Seperator;
