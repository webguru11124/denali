import {
  BasicChannelInfo,
  BasicRelevantChannelInfo,
} from 'submodules/common-ui/generated/api/gcs';

const getChannelTitle = (
  channel: BasicChannelInfo | BasicRelevantChannelInfo | null
) => {
  let text = '-';
  if (!channel?.title) return text;
  const defaultLang = Object.keys(channel.title).find(
    (e) => channel.title[e].isDefault
  );
  if (defaultLang) text = channel.title[defaultLang].title;
  else text = channel.title[Object.keys(channel.title)[0]].title;

  return text;
};

export default getChannelTitle;
