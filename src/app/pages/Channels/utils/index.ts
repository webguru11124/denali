import { ChannelTitleTranslation } from 'submodules/common-ui/generated/api/gcs';

import { TitleLanguage } from '../types';

const convertTitlesToVariants = (
  titles: TitleLanguage[]
): ChannelTitleTranslation => {
  const treatedTitle: ChannelTitleTranslation = {};

  for (const title of titles) {
    treatedTitle[title.code] = {
      title: title.value,
      translationStatus: 'draft',
      isDefault: title.isMain,
    };
  }

  return treatedTitle;
};

export { convertTitlesToVariants };
export default convertTitlesToVariants;
