import { cx } from '@emotion/css';
import styled from '@emotion/styled';
import config from 'app/config';
import { parsers } from 'app/utils';
import React from 'react';

const textParsers = [
  parsers.parseMarkdown,
  parsers.parseYoutubeLinks,
  parsers.parseVimeoLinks,
  parsers.parseCenteredText,
];

const parseContent = (text: string) => {
  let parsedText = text;

  textParsers.forEach((parser) => {
    parsedText = parser(parsedText);
  });

  return parsedText;
};

const Container = styled.div`
  h1 {
    font-size: 3rem; // 48px
    line-height: 3.5rem; // 56px
  }

  h2 {
    font-size: 2rem; // 32px
    line-height: 2.75rem; // 40px
  }

  h3 {
    font-size: 1.75rem; // 28px
    line-height: 2.25rem; // 40px
  }

  h4 {
    font-size: 1.25rem; //20px
    line-height: 1.75rem; //28px
  }

  h5 {
    font-size: 1rem; // 16px
    line-height: 1.5rem; // 24px
  }

  h6 {
    font-size: 0.875rem; // 14px
    line-height: 1.25rem; // 20px
  }

  iframe {
    width: 100%;
  }

  p {
    font-size: 1rem; // 16px
    line-height: 1.5rem; // 24px
    padding-bottom: 1rem;
  }

  a {
    text-decoration: underline;
    color: ${config.colors.focus};

    &:hover {
      color: ${config.colors['grayscale-secondary']};
    }
  }

  ul {
    list-style-type: disc;
    padding-left: 30px;
  }

  ol {
    list-style-type: decimal;
    padding-left: 30px;
  }
`;

/**
 * **UNSAFE** method - might not work as expected but is sufficient for now
 *
 * Due to original implementation there are multiple data formats stored in News Article description
 * Data can be:
 * - **HTML** - it has been deprecated for quite some time (probably for around 2 years at the moment
 * of writing this comment: **2022-01-11**)
 * - **Markdown** - this is the type used when creating News from admin panel
 * - **Plain text** with newline symbols: \n. This type of content is created from Web or Mobile apps
 *
 * The database stores a boolean flag `markdown`, so we know when to parse the data as markdown,
 * however there is no way to know if it's **HTML** ir plain text...
 *
 * The css rule of `white-space: pre-line` should only be applied in case of Plain text.
 * Only old clients will have real content with HTML and that content will at the bottom of the
 * history list. This means, current solution should work 99% of the time for most recent clients.
 *
 * *If we do run into bad cases the fix should be tested for all 3 types of data*
 */
// TODO: add a rule to eslint config to allow a prefix UNSAFE
// eslint-disable-next-line @typescript-eslint/naming-convention
const UNSAFE_isWhitespacePreLineEnabled = ({
  isMarkdown,
}: {
  isMarkdown: boolean;
}): boolean => !isMarkdown;

interface HtmlContentProps {
  content: string;
  isMarkdown: boolean;
  className?: string;
}

const HtmlContent: React.FC<HtmlContentProps> = ({
  content,
  isMarkdown,
  className,
}) => (
  <Container>
    <div
      className={cx(
        'break-words',
        {
          'whitespace-pre-line': UNSAFE_isWhitespacePreLineEnabled({
            isMarkdown,
          }),
        },
        className
      )}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: isMarkdown ? parseContent(content) : content,
      }}
    />
  </Container>
);

export default HtmlContent;
