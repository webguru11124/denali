import { Empty } from 'app/components';
import { useNewsTranslation } from 'app/internationalization/hooks';
import banjoIcon from 'assets/icons/banjo.svg';
import React from 'react';

const CommentsEmpty: React.FC = () => {
  const { t } = useNewsTranslation();
  const CONTENT = {
    image: <img src={banjoIcon} alt="Banjo" />,
    heading: t('There are no comments yet'),
    text: t('Here’s a banjo'),
  };

  return <Empty className="mt-16 mb-12" content={CONTENT} />;
};

export default CommentsEmpty;
