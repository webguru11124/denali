import { useModulesTranslation } from 'app/internationalization/hooks';
import { ModulesKeys } from 'app/internationalization/types';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import BreadcrumbTruncate from './BreadcrumbTruncate';

interface TitleWithTranslationKey {
  translationKey: ModulesKeys;
}

type Title = TitleWithTranslationKey | string;

interface DefaultBreadcrumbProps {
  title?: Title;
  to: string;
}

const DefaultBreadcrumb: FC<DefaultBreadcrumbProps> = ({ to, title }) => {
  const { t } = useModulesTranslation();

  const getTitle = () => {
    if (!title) return '...';

    if (typeof title === 'string') {
      return title;
    }

    return t(title.translationKey);
  };
  return (
    <>
      <Link to={to}>
        <BreadcrumbTruncate title={getTitle()} />
      </Link>
    </>
  );
};

export default DefaultBreadcrumb;
