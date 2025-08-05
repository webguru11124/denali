import { ContentParser } from './types';

const extractYoutubeId = (youtubeLink: string): string | null => {
  const result =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/.exec(
      youtubeLink
    );

  if (result?.[1]) {
    return result[1];
  }

  return null;
};

const embedYoutubeLinks = (
  links: RegExpMatchArray,
  htmlString: string
): string => {
  let parsedHtmlString = htmlString;

  links.forEach((link) => {
    const videoId = extractYoutubeId(link);

    if (videoId) {
      const aTag = `<a href="${link}">video</a>`;
      const iframeTag = `<div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></div>`;

      parsedHtmlString = parsedHtmlString.replace(aTag, iframeTag);
    }
  });

  return parsedHtmlString;
};

const extractYoutubeLinks = (htmlString: string): RegExpMatchArray | null =>
  htmlString.match(
    /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w-]{11})[?=&+%;\w-]*/gi
  );

/**
 * Finds youtube links and converts them to embeded iframes
 */
const parseYoutubeLinks: ContentParser = (htmlString) => {
  const links = extractYoutubeLinks(htmlString);

  if (links) {
    return embedYoutubeLinks(links, htmlString);
  }

  return htmlString;
};

export default parseYoutubeLinks;
