import removeMarkdown from 'remove-markdown';
import removeHtml from 'striptags';

type GetPlainText = (text: string, isMarkedown: boolean) => string;

const getPlainText: GetPlainText = (text, isMarkdown) =>
  isMarkdown ? removeMarkdown(text) : removeHtml(text);

export default getPlainText;
