import { css } from '@emotion/css';
import { HtmlContent } from 'app/components';
import TypedIconButton from 'app/components/TypedIconButton';
import { useTranslations } from 'app/hooks';
import React from 'react';

import TitleAndContentBasic from './TitleAndContentBasic';

interface TitleAndContentProps {
  id: number;
  name: string;
  content: string;
}

const TitleAndContent: React.FC<TitleAndContentProps> = ({
  id,
  name,
  content,
}) => {
  const {
    translations: [translatedName, translatedContent],
    isTranslating,
    isTranslated,
    toggleTranslation,
  } = useTranslations([name, content]);

  return (
    <TitleAndContentBasic
      id={id}
      name={translatedName}
      content={translatedContent}
      isTranslating={isTranslating}
      isTranslated={isTranslated}
      onTranslate={toggleTranslation}
    />
  );
};

export default TitleAndContent;
