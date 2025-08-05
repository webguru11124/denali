import { css } from '@emotion/css';
import { HtmlContent } from 'app/components';
import TypedIconButton from 'app/components/TypedIconButton';
import React from 'react';

interface TitleAndContentBasicProps {
  id: number;
  name: string;
  content: string;
  isTranslating: boolean;
  isTranslated: boolean;
  onTranslate: () => void;
}

const TitleAndContentBasic: React.FC<TitleAndContentBasicProps> = ({
  id,
  name,
  content,
  isTranslating,
  isTranslated,
  onTranslate,
}) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <p className="font-bold text-grayscale-primary text-lg">{name}</p>
        <TypedIconButton
          onClick={onTranslate}
          isActive={isTranslated}
          isLoading={isTranslating}
          variant="translate"
          className="ml-auto"
        />
      </div>
      <HtmlContent
        isMarkdown
        className={css`
          img {
            border-radius: 12px;
          }
        `}
        content={content}
      />
    </div>
  );
};

export default TitleAndContentBasic;
