import { ContentParser } from './types';

/**
 * Finds text wrapped by '$$$text$$$' and replaces them to center tag.
 */
const parseCenteredText: ContentParser = (htmlString) =>
  htmlString.replace(
    /~center~(.*?(?=~center~))~center~/gms,
    '<center>$1</center>'
  );

export default parseCenteredText;
