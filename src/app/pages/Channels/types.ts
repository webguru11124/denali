import { ChannelCoverImage } from 'app/api/channels/types';
import { UseFormReturn } from 'react-hook-form';
import { BasicChannelInfo } from 'submodules/common-ui/generated/api/gcs';
export interface TitleLanguage {
  code: string;
  name: string;
  checked: boolean;
  isMain: boolean;
  value: string;
}

export type FormType = 'edit' | 'new' | 'empty';

export interface DraftChannelInfo extends BasicChannelInfo {
  isDraft?: boolean;
}

export type FormDefaultValue = {
  image: ChannelCoverImage;
  notify: boolean;
  titles: TitleLanguage[];
};

export type UseFormHook = Pick<
  UseFormReturn<FormDefaultValue, any>,
  | 'register'
  | 'handleSubmit'
  | 'formState'
  | 'watch'
  | 'setValue'
  | 'getValues'
  | 'trigger'
>;

export type ISOLanguage = {
  name: string;
  code: string;
};
