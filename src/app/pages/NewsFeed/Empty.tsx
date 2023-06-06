import { Empty as EmptyPage } from 'app/components';
import { useNewsTranslation } from 'app/internationalization/hooks';
import React from 'react';

type Variant = 'latest' | 'archived' | 'search' | 'category';

interface EmptyProps {
  variant: Variant;
}

const Empty: React.FC<EmptyProps> = ({ variant }) => {
  const { t } = useNewsTranslation();

  const CONTENT = {
    latest: {
      image: t('Empty_news_latest_logo'),
      heading: t('News is the first draft of history.'),
      text: t('But there are no News Articles here yet.'),
    },
    archived: {
      image: t('Empty_news_archived_logo'),
      heading: t('Nothing on the archive.'),
      text: t('Try looking somewhere else.'),
    },
    search: {
      image: t('Empty_news_search_logo'),
      heading: t('If you haven’t found it yet, keep looking.'),
      text: t('In other words, no results found.'),
    },
    category: {
      image: t('Empty_news_category_logo'),
      heading: t('No results found for this tag.'),
      text: t("That's boring, but try using another one."),
    },
  };

  return <EmptyPage content={CONTENT[variant]} />;
};

export default Empty;
