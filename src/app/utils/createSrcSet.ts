import { types } from 'app/api';

import isDefined from './isDefined';

const SIZES = {
  small: '640w',
  medium: '768w',
  large: '1024w',
  extraLarge: '1280w',
};

type MediaKey = keyof typeof SIZES;

const isPlaceholder = (url: string): boolean => url.includes('no-avatar');

const createSrcSet = (responsiveMedia: types.ResponsiveMediaSizes) => {
  let placeholdersAmount = 0;
  const sets = Object.entries(responsiveMedia)
    .map(([rawKey, value]) => {
      // Count total placeholders in given set
      if (isPlaceholder(value)) placeholdersAmount += 1;
      const key = rawKey as MediaKey;
      if (!value) return undefined;

      return `${value} ${SIZES[key]}`;
    })
    .filter(isDefined);
  // If all values are placeholders return set
  if (placeholdersAmount === sets.length) return sets.join(',');

  return sets.filter((value) => !isPlaceholder(value)).join(',');
};

export default createSrcSet;
