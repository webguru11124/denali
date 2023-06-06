import { ContentParser } from './types';

const extractVimeoLinks = (htmlString: string): RegExpMatchArray | null =>
  htmlString.match(
    /(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|)(\d+)(?:|\/\?)/gi
  );

const extractVimeoId = (vimeoLink: string): string | null => {
  const result =
    /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_-]+)?/i.exec(
      vimeoLink
    );

  if (result?.[1]) {
    return result[1];
  }

  return null;
};

const embedVimeoLinks = (
  links: RegExpMatchArray,
  htmlString: string
): string => {
  let parsedHtmlString = htmlString;

  links.forEach((link) => {
    const videoId = extractVimeoId(link);

    if (videoId) {
      const aTag = `<a href="${link}">video</a>`;
      const iframeTag = `<div class="video-container"><iframe width="560" height="315" src="https://player.vimeo.com/video/${videoId}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>`;

      parsedHtmlString = parsedHtmlString.replace(aTag, iframeTag);
    }
  });

  return parsedHtmlString;
};

/**
 * Finds vimeo links and converts them to embeded iframes
 */
const parseVimeoLinks: ContentParser = (htmlString) => {
  const links = extractVimeoLinks(htmlString);

  if (links) {
    return embedVimeoLinks(links, htmlString);
  }

  return htmlString;
};

export default parseVimeoLinks;
