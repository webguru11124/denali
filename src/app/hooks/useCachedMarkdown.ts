import { marked } from 'marked';
import { useRef } from 'react';

const useCachedMarkdown = (markdown: string) => {
  const markdownRef = useRef<string | undefined>();

  if (!markdownRef.current) {
    markdownRef.current = marked.parse(markdown);
  }

  return markdownRef.current;
};

export default useCachedMarkdown;
