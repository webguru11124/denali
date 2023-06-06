import { BasicChannelInfo } from 'submodules/common-ui/generated/api/gcs';

import { FormDefaultValue } from './types';

const FORM_DEFAULT_VALUES: FormDefaultValue = {
  image: {
    type: 'internal',
    id: '',
    name: '',
    url: '',
  },
  titles: [
    {
      code: 'en',
      name: 'English',
      checked: true,
      isMain: true,
      value: '',
    },
  ],
  notify: true,
};

const CHANNEL_INITIAL_DATA: BasicChannelInfo = {
  coverImage: {
    type: 'internal',
    url: '',
    id: '',
    name: '',
  },
  createdAt: '',
  createdBy: 0,
  updatedAt: '',
  hideIfEmpty: false,
  id: 1,
  pushNotification: true,
  ranking: 0,
  title: {
    en: {
      isDefault: true,
      title: '',
      translationStatus: 'draft',
    },
  },
};

export { FORM_DEFAULT_VALUES, CHANNEL_INITIAL_DATA };
