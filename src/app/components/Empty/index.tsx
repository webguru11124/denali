import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import React from 'react';

interface EmptyProps {
  content: {
    image: string | JSX.Element;
    heading: string | JSX.Element;
    text?: string | JSX.Element;
  };
  className?: string;
}

const EmojiContainer = styled.div`
  font-size: 3.75rem; // 60px
`;

const Empty: React.FC<EmptyProps> = ({ content, className }) => (
  <div
    className={cx(
      'flex justify-center text-center flex-col w-full h-full items-center mb-16',
      className
    )}
  >
    <EmojiContainer>{content.image}</EmojiContainer>
    <p className="text-lg font-bold text-grayscale-primary mt-3">
      {content.heading}
    </p>
    {content.text && (
      <p className="text-grayscale-secondary mt-2">{content.text}</p>
    )}
  </div>
);

export default Empty;
