import { marked } from 'marked';

import { ContentParser } from './types';

const parseMarkdown: ContentParser = (text) =>
  marked.parse(text, { breaks: true });

export default parseMarkdown;
